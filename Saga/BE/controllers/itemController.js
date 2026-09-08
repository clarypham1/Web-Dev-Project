const Item = require("../models/itemModel.js");

const getAllItems = (req, res) => {
  res.json(Item.getAll());
};
 
const createItem = (req, res) => { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  const { name, info, image, price, duration, groupSize, rating, availability } = req.body;
  const newItem = Item.addOne(name, info, image, price, duration, groupSize, rating, availability);
  if (newItem) {
    res.status(201).json(newItem);
  } else {
    res.status(500).json({ message: "Failed to create item" });
  }
};

const getItemById = (req, res) => {
  const itemId = req.params.itemId;
  const item = Item.findById(itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

const updateItem = (req, res) => {
  const itemId = req.params.itemId;
  const updatedData = req.body;
  const updatedItem = Item.updateOneById(itemId, updatedData);
  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

const deleteItem = (req, res) => {
  const itemId = req.params.itemId;
  const isDeleted = Item.deleteOneById(itemId);
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
