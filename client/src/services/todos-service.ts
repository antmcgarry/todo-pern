import instance from "./instance";
import type { ITodo } from "./interfaces/todo";

const TODO_PATH = "/todos";

export const getTodos = async (userid: string): Promise<ITodo[]> => {
  try {
    const response = await instance.get<ITodo[]>(TODO_PATH, {
      params: {
        user_id: userid,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await instance.delete(`${TODO_PATH}/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (todo: ITodo): Promise<ITodo> => {
  try {
    const response = await instance.post<ITodo>(TODO_PATH, todo);
    return response.data;
  } catch (error) {
    console.log(error);
    return {} as ITodo;
  }
};

export const updateTodo = async (todo: ITodo): Promise<ITodo> => {
  try {
    const response = await instance.patch<ITodo>(
      `${TODO_PATH}/${todo.id}`,
      todo
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {} as ITodo;
  }
};
