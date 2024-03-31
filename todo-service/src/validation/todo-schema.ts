import zod from "zod";

export const CreateTodoSchema = zod.object({
  label: zod.string(),
  description: zod.string().optional(),
  due_date: zod.date().optional(),
});

export const UpdateTodoSchema = zod.object({
  label: zod.string().optional(),
  description: zod.string().optional(),
  due_date: zod.date().optional(),
});

export const getTodoById = zod.object({
  id: zod.string(),
});
