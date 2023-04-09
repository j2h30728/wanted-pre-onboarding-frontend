import { useState } from "react";

export const useEmailInput = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    !/@/.test(event.target.value) && event.target.value.length > 3
      ? setEmailError(`이메일 형식으로 입력해주세요.`)
      : setEmailError("");
    setEmail(event.target.value);
  };

  return { handleEmailInput, email, setEmail, emailError, setEmailError };
};

export default useEmailInput;
