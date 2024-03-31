import { Router } from "express";
import TodoRoutes from "./todo-routes";

const router = Router();

router.use(TodoRoutes);

export default router;
