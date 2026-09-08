const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js')
const {

  getAllItems,

  getItemById,

  createItem,

  updateItem,

  deleteItem,

} = require('../controllers/itemController.js');

// ROUTES
// GET /items
router.get("/", getAllItems);

router.use(auth);

// POST /items
router.post("/", createItem);

// GET /items/:itemId
router.get("/:itemId", getItemById);

// PUT /items/:itemId
router.put("/:itemId", updateItem);

// DELETE /items/:itemId
router.delete("/:itemId", deleteItem);

module.exports = router