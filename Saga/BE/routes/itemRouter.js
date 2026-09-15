import express from "express";
const router = express.Router()
//const auth = require('../middleware/auth.js')

import { //const to import

  getAllItems,

  getItemById,

  createItem,

  updateItem,

  deleteItem,

} from "../controllers/itemController.js";

// ROUTES
// GET /items
router.get("/", getAllItems);

//router.use(auth);

// POST /items
router.post("/", createItem);

// GET /items/:itemId
router.get("/:itemId", getItemById);

// PUT /items/:itemId
router.put("/:itemId", updateItem);

// DELETE /items/:itemId
router.delete("/:itemId", deleteItem);

export default router;

//module.exports = router