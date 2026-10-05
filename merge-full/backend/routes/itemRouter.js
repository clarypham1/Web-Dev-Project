import express from "express";
const router = express.Router()
import upload from "../middleware/upload.js"; //for images
import { uploadItemImage } from "../controllers/itemController.js";
import { optionalAuth } from "../middleware/requireAuth.js";
//const auth = require('../middleware/auth.js')

import { //const to import
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

// ROUTES
router.use(optionalAuth);

// GET /items
router.get("/", getAllItems);

//router.use(auth);

// POST /items
router.post("/", createItem);

// POST /image
router.post("/image", upload.single("image"), uploadItemImage);

// GET /items/:itemId
router.get("/:itemId", getItemById);

// PUT /items/:itemId
router.put("/:itemId", updateItem);

// DELETE /items/:itemId
router.delete("/:itemId", deleteItem);

// POST /image
//router.post("/image", upload.single("image"), uploadItemImage);

export default router;

//module.exports = router