import { Request, Response } from "express";
import pool from "@/config/db";
import { Todo } from "@/models/todo";

// const user_id = "dcf267ef-0dbe-47c9-9a21-bbc9b13fea0a";

export const getTodos = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  try {
    const todos = await pool.query<Todo[]>(
      "SELECT * FROM todos WHERE user_id = $1",
      [user_id]
    );
    res.status(200).json(todos.rows);
  } catch (err: any) {
    console.log(err);
    res.status(500);
    res.send(err.message);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, user_id, description, progress } = req.body;
  try {
    const newTodo = await pool.query<Todo>(
      "INSERT INTO todos (title, user_id, description, progress) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, user_id, description, progress]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (err: any) {
    console.log(err);
    res.status(500);
    res.send(err.message);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.status(204).json({ message: "Todo deleted successfully" });
  } catch (err: any) {
    console.log(err);
    res.status(500);
    res.send(err.message);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, progress } = req.body;
  try {
    const updatedTodo = await pool.query<Todo>(
      "UPDATE todos SET title = $1, description = $2, progress = $3 WHERE id = $4 RETURNING *",
      [title, description, progress, id]
    );
    res.status(200).json(updatedTodo.rows[0]);
  } catch (err: any) {
    console.log(err);
    res.status(500);
    res.send(err.message);
  }
};
