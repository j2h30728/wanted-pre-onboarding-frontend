import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../util/api";
import useToken from "./useToken";

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
interface InputTodo {
  todo: string;
  isCompleted?: boolean;
}

const useTodo = () => {
  const { getToken } = useToken();
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

  const updateTodo = async ({ todo, isCompleted }: InputTodo) => {
    return await axios.put<Todo, AxiosResponse<Todo>, InputTodo>(
      `${BASE_URL}todos`,
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

  return { createTodo, getTodo, updateTodo };
};

export default useTodo;
