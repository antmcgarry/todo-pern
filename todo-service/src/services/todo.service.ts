import { AppDataSource } from "@/data-source";
import { Todo } from "@/entities/todo";

const TodoRepository = AppDataSource.getRepository(Todo);

const createTodo = async (todo: Partial<Todo>) => {
  const newTodo = TodoRepository.create(todo);
  await TodoRepository.save(newTodo);
  return newTodo;
};

const getTodos = async (id: string) => {
  return await TodoRepository.findAndCountBy({ user_id: id });
};

const getTodoById = async (id: string) => {
  return await TodoRepository.findOneBy({ id });
};

const updateTodo = async (id: string, todo: Partial<Todo>) => {
  const updatedTodo = await TodoRepository.update(id, todo);
  return updatedTodo;
};

const deleteTodo = async (id: string) => {
  const todo = await TodoRepository.findOneBy({ id });
  if (!todo) {
    return null;
  }
  await TodoRepository.delete(id);
  return todo;
};

const todoService = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};

export default todoService;
