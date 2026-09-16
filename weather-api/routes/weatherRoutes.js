import express from "express"
import { handleGetWeather } from "../controllers/weatherController.js";

const router = express.Router();

//get
router.get("/weather", handleGetWeather)
export default router; 