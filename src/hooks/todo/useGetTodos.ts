import { useEffect, useState } from "react";
import { Todo } from "../../types/todo";
import useAxios from "../useAxios";
import { getToken } from "../auth/useToken";
import { AxiosResponseType } from "../../types/api";

const useGetTodos = () => {
  const token = getToken();
  const [request, { data, loading }] = useAxios<AxiosResponseType>();
  const [todos, setTodos] = useState<Todo[]>();
  useEffect(() => {
    setTodos(data);
  }, [loading]);
  const handleGetTodos = () => {
    request("get", `todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { handleGetTodos, todos };
};
export default useGetTodos;
