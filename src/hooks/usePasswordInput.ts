import { useState } from "react";

const usePasswordInput = () => {
  const [password, setPassword] = useState<string>();
  const [passwordError, setPaswordError] = useState<string>();

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value.length < 8
      ? setPaswordError(`비밀번호는 최소 8자 이상입니다.`)
      : setPaswordError("");
    setPassword(event.target.value);
  };

  return { handlePassword, password, setPassword, passwordError };
};
export default usePasswordInput;
