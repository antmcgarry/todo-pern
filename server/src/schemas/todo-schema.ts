import { z } from "zod";

export const getTodosSchema = z.object({
  user_id: z.string().uuid(),
});

export const createTodoSchema = z.object({
  title: z.string().min(1).max(255),
  user_id: z.string().uuid(),
  description: z.string().min(1).max(255),
  progress: z.number().min(0).max(100),
});

export const deleteTodoSchema = z.object({
  id: z.string().uuid(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  progress: z.number().min(0).max(100),
});
