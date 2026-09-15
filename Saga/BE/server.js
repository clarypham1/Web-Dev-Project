import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemRouter from "./routes/itemRouter.js";
console.log("ITEM ROUTER LOADED");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());


app.use("/items", itemRouter)


//test route
app.get("/", (req, res) => {
  res.json({
    message: "Closis is running (test route)"
  });
});

//connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });