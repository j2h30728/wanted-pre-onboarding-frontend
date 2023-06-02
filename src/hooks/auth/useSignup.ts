import { User } from "../../types/auth";
import useApi from "../useApi";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [reqest, { response }] = useApi<User>();
  const nav = useNavigate();
  const handleSignup = async ({ email, password }: User) => {
    try {
      if (!email || !password) throw new Error("잘못된 입력입니다.");
      reqest("post", `auth/signup`, { email, password });
      if (response.status === 201) {
        alert("회원가입 되었습니다.");
        nav("/signin");
      }
    } catch (error) {
      alert(error);
    }
  };
  return handleSignup;
};
export default useSignup;
