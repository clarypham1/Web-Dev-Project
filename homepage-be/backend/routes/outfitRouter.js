import express from "express";
import {
  getHistory,
  createOutfit,
  useOutfit,
  deleteOutfit,
} from "../controllers/outfitController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

//every outfit route is for logged-in users only
router.use(requireAuth);

router.get("/history", getHistory);
router.post("/", createOutfit);
router.patch("/:outfitId/use", useOutfit);
router.delete("/:outfitId", deleteOutfit);

export default router;
