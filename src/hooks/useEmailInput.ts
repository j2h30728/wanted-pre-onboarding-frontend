import { useState } from "react";

export const useEmailInput = () => {
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string>();

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(!/@/.test(event.target.value));
    !/@/.test(event.target.value)
      ? setEmailError(`이메일 형식을 지켜주십시오`)
      : setEmailError("");
    setEmail(event.target.value);
  };

  return { handleEmailInput, email, setEmail, emailError };
};

export default useEmailInput;
