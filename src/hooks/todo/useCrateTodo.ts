import { useState } from "react";
import useApi from "../useApi";
import { AxiosResponseType } from "../../types/api";

const useCreateTodo = () => {
  const [request, { data }] = useApi<AxiosResponseType>();
  const [input, setInput] = useState<string>("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handlecreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (input === "") throw new Error("입력칸을 채워주세요.");
      request("post", `todos`, { todo: input });
      setInput("");
    } catch (error) {
      alert(error);
    }
  };
  return { handlecreateTodo, handleInput, input, isCreated: data };
};
export default useCreateTodo;
