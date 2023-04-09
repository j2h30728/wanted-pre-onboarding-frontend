import { Todo, updateTodo } from "../api/todo";
import { useState } from "react";
import { AxiosError, isAxiosError } from "axios";

const useCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = (todo: Partial<Todo>) => {
    updateTodo({ ...todo, isCompleted: !todo.isCompleted })
      .then(response => response.status === 200 && setIsChecked(prev => !prev))
      .catch(e => {
        if (e instanceof AxiosError) {
          alert(`[ERROR] ${e.response?.data.message}`);
        }
      });
  };
  return { handleCheckbox, isChecked };
};
export default useCheckbox;
