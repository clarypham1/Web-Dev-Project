//const Item = require("../models/itemModel.js");
import Item from "../models/itemModel.js";
import claude from "../config/claudeControl.js";

// cloudinary upload thing:
import cloudinary from "../config/cloudinary.js";

const uploadItemImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded"
      }); 
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "closis/items",
          resource_type: "image",
          eager: [{   //this removes the background
              effect: "background_removal"
            }]
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });


    //Claude sorting data (clothing-info-fields)
    const clothingItemSortingTool = {
      name: "sort_item",
      description: "Identify and suggest the attributes of the clothing item in the image.",
      input_schema: {
        type: "object",
        properties: {

          name: {
            type: "string",
            description: "A short suggested name for the clothing item."
          },

          type: {
            type: "string",
            enum: [ //enum makes claude choose only from these options:
              "t-shirt",
              "shirt",
              "hoodie",
              "jeans",
              "shorts",
              "dress",
              "jacket",
              "shoes",
              "accessory",
              "other"
            ]
          },

          colour: {
            type: "string",
            enum: [
              "black",
              "white",
              "gray",
              "red",
              "blue",
              "green",
              "yellow",
              "brown",
              "pink",
              "multicolor",
              "other"
            ]
          },

          style: {
            type: "string",
            enum: [
              "casual",
              "formal",
              "sporty",
              "streetwear",
              "alternative",
              "elegant",
              "minimalist",
              "vintage",
              "other"
            ]
          },

          season: {
            type: "string",
            enum: [
              "spring",
              "summer",
              "autumn",
              "winter",
              "all-season"
            ]
          }

        },

        //these are must gives:
        required: [ 
          "name",
          "type",
          "colour",
          "style",
          "season"
        ]
      }
    };

    //wait for claude to answer req, also create req:
    const claudeResponse = await claude.messages.create({
      model: "claude-haiku-4-5-20251001", //using this, because according to AI this is the best one for the job atm
      max_tokens: 300, //limits how much claude is allowed to generate
      tools: [clothingItemSortingTool], //fomat
      tool_choice: {
        type: "tool",
        name: "sort_item"
      },
      messages: [ //this is the message actually going to claude
        {
          role: "user",
          content: [ 
            {
              type: "image",
              source: {
                type: "base64",
                media_type: req.file.mimetype, //png,jpeg... 
                data: req.file.buffer.toString("base64")
              }//turn the image from memory to string so it can be put to api req.
            },
            {
              type: "text", //instructions
              text: "Analyze this clothing item. Suggest a short name and identify its type, main colour, style, and suitable season. Do not guess the size or comfort level."
            }
          ]
        }
      ]
    });

    const toolUse = claudeResponse.content.find(
      (block) => block.type === "tool_use"
    ); //go through the block to find tool_use block

    if (!toolUse) { //if no message error
      return res.status(502).json({
        message: "No result from Claude"
      }); //in this case check claude if it needs more tokens
    }     //Saga has the info/login thingies




    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      publicId: result.public_id,
      
      //background removed image url: 
      backgroundRemovedImageUrl: result.eager?.[0]?.secure_url,


      //claude suggestions
      name: toolUse.input.name, //ex. claude generated name
      type: toolUse.input.type, //ex. hoodie
      colour: toolUse.input.colour,
      style: toolUse.input.style,
      season: toolUse.input.season
      
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Image upload failed"
    });
  }
};
// ends heree


const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({

      message: "Could not getAllItems",
      error: error.message
    })
  } 
  
};


const createItem = async (req, res) => { 
  try {
    const { name, type, image, colour, times_used, style, brand, details, size, comfy_level, season } = req.body;
    const newItem = await Item.create({name, type, image, colour, times_used, style, brand, details, size, comfy_level, season});

    //then we senddd to postman/fe
    res.status(201).json(newItem);
  }
  catch (error){
    res.status(400).json({
      message: "Could not createItem",
      error: error.message
    })
  }
};


/*    if (newItem) {
    res.status(201).json(newItem);    // i don't think this error part is necessary but will leave it for now
  } else {
    res.status(500).json({ message: "Failed to create item" });
  }*/

const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  }
  catch (error) {
    res.status(400).json({
      message: "Could not getItemById",
      error: error.message
    })
  }
  
};

const updateItem = async (req, res) => {
  
  try {
    const itemId = req.params.itemId;
    const updatedData = req.body;
    
    //findbyidandupdate is mongooses own function
    const updatedItem = await Item.findByIdAndUpdate(
    itemId,
    updatedData,
    {
      new: true,
      runValidators: true
    }
    );

    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  }

  catch (error) {
    res.status(400).json({
      message: "Could not updateItem",
      error: error.message
    })
  }
  
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    //once again mongoose built-in function:
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (deletedItem) { //if (we found and deleted item)
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Item not found" });
    }
    }

    catch (error) {
      res.status(400).json({
      message: "Could not deleteItem",
      error: error.message
    })
    }
};

export {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  uploadItemImage,
};