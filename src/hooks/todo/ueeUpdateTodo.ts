import { useState } from "react";
import { Todo } from "../../types/todo";
import { getToken } from "../auth/useToken";
import useAxios from "../useAxios";
import { AxiosResponseType } from "../../types/api";

const useUpdateTodo = (todo: Todo) => {
  const [checkboxStatus, setCheckboxStatus] = useState<boolean>(
    todo.isCompleted
  );
  const [request, { data }] = useAxios<AxiosResponseType>();
  const [updateInput, setUpdateInput] = useState<string>(todo.todo);
  const token = getToken();

  const handleUpdateTodo = async (todo: Partial<Todo>) => {
    try {
      request(
        "put",
        `todos/${todo.id}`,
        {
          ...todo,
          todo: updateInput ? updateInput : todo.todo,
          isCompleted: checkboxStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      alert(error);
    }
  };
  return {
    handleUpdateTodo,
    setCheckboxStatus,
    updateInput,
    setUpdateInput,
    data,
  };
};
export default useUpdateTodo;
