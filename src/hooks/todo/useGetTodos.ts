import { AxiosError } from "axios";
import { useState } from "react";
import { deleteTodo, getTodo } from "../../api/todo";
import { Todo } from "../../types/todo";

const useGetTodos = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const handleGetTodos = async () => {
    try {
      const response = await getTodo();
      if (response) setTodos(response.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`[ERROR] ${e.response?.data.message}`);
      } else {
        alert(e);
      }
    }
  };
  return { handleGetTodos, todos };
};
export default useGetTodos;
