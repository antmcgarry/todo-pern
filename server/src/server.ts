import "dotenv/config";
import express from "express";
import todoRoutes from "@/routers/todos-routes";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
