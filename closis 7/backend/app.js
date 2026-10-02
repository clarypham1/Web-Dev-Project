// load .env first (this import runs before the others, so process.env is ready)
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./routes/userRouter.js";
import outfitRouter from "./routes/outfitRouter.js";
import itemRouter from "./routes/itemRouter.js";
import weatherRouter from "./routes/weatherRouter.js";
import { unknownEndpoint, errorHandler } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 4000;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing - copy .env.example to .env and fill it in");
  process.exit(1);
}
if (!process.env.SECRET) {
  console.error("SECRET is missing - copy .env.example to .env and fill it in");
  process.exit(1);
}

const app = express();


app.use(cors()); 
app.use(express.json({ limit: "5mb" })); 


app.get("/api", (req, res) => {
  res.json({ message: "Closis API is running" });
});


app.use("/api/users", userRouter);
app.use("/api/outfits", outfitRouter);
app.use("/api/items", itemRouter);
app.use("/api/weather", weatherRouter);


app.use(unknownEndpoint);
app.use(errorHandler);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

export default app;
