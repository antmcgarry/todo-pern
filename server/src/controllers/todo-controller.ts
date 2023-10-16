import { Request, Response } from "express";
import pool from "@/config/db";
import { Todo } from "@/models/todo";

// const user_id = "dcf267ef-0dbe-47c9-9a21-bbc9b13fea0a";

export const getTodos = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  if (!user_id) {
    res.status(400);
    res.send("user_id is required");
    return;
  }
  try {
    const todos = await pool.query<Todo[]>(
      "SELECT * FROM todos WHERE user_id = $1",
      [user_id]
    );
    res.json(todos.rows);
  } catch (err: any) {
    console.log(err);
    res.status(500);
    res.send(err.message);
  }
};
