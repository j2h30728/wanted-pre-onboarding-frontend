import { useEffect, useState } from "react";
import { Todo } from "../../types/todo";
import useApi from "../useApi";

const useGetTodos = () => {
  const [request, { data, loading }] = useApi();
  const [todos, setTodos] = useState<Todo[]>();
  useEffect(() => {
    setTodos(data);
  }, [loading, data]);
  const handleGetTodos = () => {
    request("get", "todos");
  };
  return { handleGetTodos, todos };
};
export default useGetTodos;
