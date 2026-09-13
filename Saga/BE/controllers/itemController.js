//const Item = require("../models/itemModel.js");
import Item from "../models/itemModel.js";

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
    const { name, type, image, colour, times_used, style, size, comfy_level, season } = req.body;
    const newItem = await Item.create({name, type, image, colour, times_used, style, size, comfy_level, season});

    //then we senddd to postman/fe
    res.status(201).json(newItem);
  }
  catch (error){
    res.status(400).jsomn({
      message: "Could not crateItem",
      error: error.message
    })
  }
/*    if (newItem) {
    res.status(201).json(newItem);    // i don't think this error part is necessary but will leave it for now
  } else {
    res.status(500).json({ message: "Failed to create item" });
  }*/
};

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
    res.status(400).jsomn({
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
    res.status(400).jsomn({
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
      res.status(400).jsomn({
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
};
