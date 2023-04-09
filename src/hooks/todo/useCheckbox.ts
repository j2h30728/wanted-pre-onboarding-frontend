import { updateTodo } from "../../api/todo";
import { useState } from "react";
import { AxiosError } from "axios";
import { Todo } from "../../types/todo";

const useCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = async (todo: Partial<Todo>) => {
    try {
      const response = await updateTodo({
        ...todo,
        isCompleted: !todo.isCompleted,
      });
      if (response.status === 200) setIsChecked(prev => !prev);
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`[ERROR] ${e.response?.data.message}`);
      } else {
        alert(e);
      }
    }
  };
  return { handleCheckbox, isChecked };
};
export default useCheckbox;
