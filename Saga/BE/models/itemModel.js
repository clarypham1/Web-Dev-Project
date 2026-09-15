import mongoose from "mongoose";


// some of these will later be autofilled/or if needed changed to false
const itemSchema = new mongoose.Schema(
  {   
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    colour: {
      type: String,
      required: true
    },

    times_used: {
      type: Number,
      required: true,
      default: 0
    },

    style: {
      type: String,
      required: true
    },

    size: {
      type: Number,
      required: true
    },

    comfy_level: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    season: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// will show as a collection called 'items' in mongodb
const Item = mongoose.model("Item", itemSchema);

export default Item;


//here for temp safekeeping / easy copy for test:
/*
const newItem = await Item.create({
  name: "Black shirt",
  type: "shirt",
  image: "shirt.jpg",
  colour: "black",
  times_used: 3,
  style: "alternative",
  size: 38,
  comfy_level: 5,
  season: "winter"
});
*/