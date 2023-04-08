import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../util/api";
import { getToken } from "./useToken";

export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export interface InputTodo {
  todo: string;
}

const useTodo = () => {
  const token = getToken();

  const createTodo = async ({ todo }: InputTodo) => {
    return await axios.post<Todo[], AxiosResponse<Todo>, InputTodo>(
      `${BASE_URL}todos`,
      {
        todo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const getTodo = async () => {
    return await axios.get<Todo[]>(`${BASE_URL}todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const updateTodo = async ({ id, todo, isCompleted }: Partial<Todo>) => {
    return await axios.put<Todo, AxiosResponse<Todo>, Partial<Todo>>(
      `${BASE_URL}todos/${id}`,
      {
        todo,
        isCompleted,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const deleteTodo = async (id: number) => {
    return await axios.delete(`${BASE_URL}todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return { createTodo, getTodo, updateTodo, deleteTodo };
};

export default useTodo;
