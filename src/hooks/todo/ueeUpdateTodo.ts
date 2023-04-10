import { AxiosError } from "axios";
import { useState } from "react";
import { updateTodo } from "../../api/todo";
import { Todo } from "../../types/todo";

const useUpdateTodo = (todo: Todo) => {
  const [checkboxStatus, setCheckboxStatus] = useState<boolean>(
    todo.isCompleted
  );

  const [updateInput, setUpdateInput] = useState<string>(todo.todo);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdateTodo = async (todo: Partial<Todo>) => {
    setIsUpdated(false);
    try {
      const response = await updateTodo({
        ...todo,
        todo: updateInput ? updateInput : todo.todo,
        isCompleted: checkboxStatus,
      });
      response.status === 200 && setIsUpdated(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`[ERROR] ${e.response?.data.message}`);
      }
    }
  };
  return {
    handleUpdateTodo,
    isUpdated,
    setCheckboxStatus,
    updateInput,
    setUpdateInput,
  };
};
export default useUpdateTodo;
