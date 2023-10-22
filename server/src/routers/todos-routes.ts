import express from "express";
import { createParamValidator, createBodyValidator } from "@/middleware";
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "@/controllers/todo-controller";
import {
  getTodosSchema,
  createTodoSchema,
  deleteTodoSchema,
  updateTodoSchema,
} from "@/schemas";

const router = express.Router();

router.get("/todos", createParamValidator(getTodosSchema), getTodos);

router.post("/todos", createBodyValidator(createTodoSchema), createTodo);

router.delete("/todos/:id", createParamValidator(deleteTodoSchema), deleteTodo);

router.patch(
  "/todos/:id",
  createParamValidator(deleteTodoSchema),
  createBodyValidator(updateTodoSchema),
  updateTodo
);

export default router;
