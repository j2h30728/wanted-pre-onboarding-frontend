import { useEffect, useState } from "react";
import { Todo } from "../../types/todo";
import useApi from "../useApi";
import { AxiosResponseType } from "../../types/api";

const useGetTodos = () => {
  const [request, { data, loading }] = useApi<AxiosResponseType>();
  const [todos, setTodos] = useState<Todo[]>();
  useEffect(() => {
    setTodos(data);
  }, [loading]);
  const handleGetTodos = () => {
    request("get", `todos`);
  };

  return { handleGetTodos, todos };
};
export default useGetTodos;
