import express from "express";
import {
  generateOutfitsForUser,
  getHistory,
  createOutfit,
  useOutfit,
  deleteOutfit,
} from "../controllers/outfitController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();


router.use(requireAuth);

router.post("/generate", generateOutfitsForUser); 
router.get("/history", getHistory); 
router.post("/", createOutfit); 
router.patch("/:outfitId/use", useOutfit);
router.delete("/:outfitId", deleteOutfit);

export default router;
