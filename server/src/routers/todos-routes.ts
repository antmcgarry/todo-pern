import express from "express";
import { getTodos } from "@/controllers/todo-controller";

const router = express.Router();

router.get("/todos", getTodos);

export default router;
