import express from "express";
import { handleGetWeather } from "../controllers/weatherController.js";

const router = express.Router();


router.get("/", handleGetWeather);

export default router;
