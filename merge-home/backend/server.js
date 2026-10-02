
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 4000;


if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing - copy .env.example to .env and fill it in");
  process.exit(1);
}
if (!process.env.SECRET) {
  console.error("SECRET is missing - copy .env.example to .env and fill it in");
  process.exit(1);
}


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
