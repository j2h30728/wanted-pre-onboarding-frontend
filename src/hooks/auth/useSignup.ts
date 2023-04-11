import { User } from "../../types/auth";
import useApi from "../useApi";
import { AxiosResponseType } from "../../types/api";

const useSignup = () => {
  const [reqest] = useApi<AxiosResponseType>();
  const handleSignup = async ({ email, password }: User) => {
    try {
      if (!email || !password) throw new Error("잘못된 입력입니다.");
      reqest("post", `auth/signup`, { email, password });
      alert("회원가입 되었습니다.");
      window.location.replace("/signin");
    } catch (error) {
      alert(error);
    }
  };
  return handleSignup;
};
export default useSignup;
