import { Todo } from "../api/todo";
import { useState } from "react";

const useInput = () => {
  const [input, setInput] = useState<string>("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return { handleInput, input, setInput };
};

export default useInput;

export const handleCheckbox = (todo: Partial<Todo>) => {
  return { ...todo, isCompleted: !todo.isCompleted };
};
