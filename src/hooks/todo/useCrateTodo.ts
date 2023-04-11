import { useState } from "react";
import useAxios from "../useAxios";
import { getToken } from "../auth/useToken";
import { AxiosResponseType } from "../../types/api";

const useCreateTodo = () => {
  const [request, { data, loading }] = useAxios<AxiosResponseType>();
  const [input, setInput] = useState<string>("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const token = getToken();
  const handlecreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (input === "") throw new Error("입력칸을 채워주세요.");
      request(
        "post",
        `todos`,
        { todo: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setInput("");
    } catch (error) {
      alert(error);
    }
  };
  return { handlecreateTodo, handleInput, input, isCreated: data && !loading };
};
export default useCreateTodo;
