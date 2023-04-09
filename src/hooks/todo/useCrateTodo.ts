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

  const handlecreateTodo = async (event: any) => {
    setIsCreated(false);
    event.preventDefault();
    try {
      const response = await createTodo({ todo: input });
      if (response.status === 201) {
        setInput("");
        setIsCreated(true);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`[ERROR] ${e.response?.data.message}`);
      } else {
        alert(e);
      }
    }
  };
  return { handlecreateTodo, isCreated, handleInput, input };
};
export default useCreateTodo;
