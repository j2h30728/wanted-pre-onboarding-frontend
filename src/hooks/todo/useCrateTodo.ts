import { AxiosError } from "axios";
import { useState } from "react";
import { createTodo } from "../../api/todo";

const useCreateTodo = () => {
  const [input, setInput] = useState<string>("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") throw new Error("입력칸을 채워주세요.");
    setInput(event.target.value);
  };
  const [isCreated, setIsCreated] = useState(false);

  const handlecreateTodo = (event: any) => {
    event.preventDefault();

    createTodo({ todo: input })
      .then(response => response.status === 201 && setIsCreated(true))
      .catch(e => {
        if (e instanceof AxiosError) {
          alert(`[ERROR] ${e.response?.data.message}`);
        }
      });
    setInput("");
    setIsCreated(false);
  };
  return { handlecreateTodo, isCreated, handleInput, input };
};
export default useCreateTodo;
