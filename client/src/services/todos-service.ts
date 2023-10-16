import instance from "./instance";
import type { ITodo } from "./interfaces/todo";

export const getDate = async (userid: string): Promise<ITodo[]> => {
  try {
    const response = await instance.get<ITodo[]>("/todos", {
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
