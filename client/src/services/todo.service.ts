import { Todo } from "@/components/todo-item";
import createAxiosInstance from "./axios-instance";

type getAllTodosResponse = {
  todos: Todo[];
  amount: number;
};

export type TodoPayload = {
  label: string;
  description: string;
  due_date?: string;
};

type TodoResponse = {
  todo: Todo;
  message: string;
};

const API = createAxiosInstance(
  process.env.NEXT_PUBLIC_API_TODO_URL || "http://localhost:5000"
);

const getAllTodos = async () => {
  const response = await API.get<getAllTodosResponse>("v1/todo");
  return response.data;
};

const getTodo = async (id: string) => {
  const response = await API.get<Todo>(`v1/todo/${id}`);
  return response.data;
};

const createTodo = async (todo: TodoPayload) => {
  const todoRequest = {
    ...todo,
    due_date: todo.due_date ? new Date(todo.due_date) : null,
  };
  const response = await API.post<TodoResponse>("v1/todo", todoRequest);
  return response.data;
};

const updateTodo = async (id: string, todo: Todo) => {
  const response = await API.put<TodoResponse>(`v1/todo/${id}`, todo);
  return response.data;
};

const deleteTodo = async (id: string) => {
  await API.delete(`/todo`, { data: { id } });
};

export { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };
