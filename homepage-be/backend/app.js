import express from "express";
import cors from "cors";

import userRouter from "./routes/userRouter.js";
import outfitRouter from "./routes/outfitRouter.js";
import itemRouter from "./routes/itemRouter.js";
import { unknownEndpoint, errorHandler } from "./middleware/errorMiddleware.js";


const app = express();

app.use(cors()); 
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Closis API is running" });
});


app.use("/api/users", userRouter);
app.use("/api/outfits", outfitRouter);
app.use("/api/items", itemRouter);


app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
