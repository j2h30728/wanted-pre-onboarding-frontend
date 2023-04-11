import { useState } from "react";
import { Todo } from "../../types/todo";
import useApi from "../useApi";
import { AxiosResponseType } from "../../types/api";

const useUpdateTodo = (todo: Todo) => {
  const [checkboxStatus, setCheckboxStatus] = useState<boolean>(
    todo.isCompleted
  );
  const [request, { data }] = useApi<AxiosResponseType>();
  const [updateInput, setUpdateInput] = useState<string>(todo.todo);
  const handleUpdateTodo = async (todo: Partial<Todo>) => {
    try {
      if (!updateInput) throw new Error("TODO 내용이 비어있습니다.");
      request("put", `todos/${todo.id}`, {
        ...todo,
        todo: updateInput,
        isCompleted: checkboxStatus,
      });
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
