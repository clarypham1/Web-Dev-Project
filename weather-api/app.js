import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";

const app = express();


app.use(cors());


app.use(express.json());

app.use("/api", weatherRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Weather API running on http://localhost:${PORT}`);
});