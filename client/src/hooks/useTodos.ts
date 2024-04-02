"use client";

import { Todo } from "@/components/todo-item";
import {
  createTodo,
  getAllTodos,
  updateTodo as updateTodoAPI,
  deleteTodo as deleteTodoAPI,
  TodoPayload,
} from "@/services/todo.service";
import { useState, useEffect } from "react";

const useTodos = () => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getAllTodos();
        setTodos(data.todos);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const addTodo = async (todo: TodoPayload) => {
    try {
      const data = await createTodo(todo);
      setTodos([...todos, data.todo]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id: string, todo: Todo) => {
    try {
      const data = await updateTodoAPI(id, todo);
      setTodos(todos.map((t) => (t.id === id ? data.todo : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoAPI(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return { todos, addTodo, updateTodo, deleteTodo };
};

export default useTodos;
