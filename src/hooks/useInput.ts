import { useState } from "react";

const useInput = () => {
  const [input, setInput] = useState<string>("");
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return { handleInput, input };
};

export default useInput;
