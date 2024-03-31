import { Request, Response } from "express";
import todoService from "@/services/todo.service";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { label, description, due_date, user } = req.body;
    const newTodo = await todoService.createTodo({
      user_id: user.user_id,
      label,
      description,
      due_date,
    });
    return res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating todo",
      error: (error as Error).message,
    });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const [todos, number] = await todoService.getTodos(user.id);
    return res.status(200).json({ todos, amount: number });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching all todos",
      error: (error as Error).message,
    });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTodoById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching todo",
      error: (error as Error).message,
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { todo: todoValues } = req.body;
    const todo = await todoService.getTodoById(todoValues.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const updatedTodo = await todoService.updateTodo(todoValues.id, {
      ...todo,
      ...todoValues,
    });
    return res.status(200).json({
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating todo",
      error: (error as Error).message,
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTodoById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todoService.deleteTodo(id);
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting todo",
      error: (error as Error).message,
    });
  }
};
