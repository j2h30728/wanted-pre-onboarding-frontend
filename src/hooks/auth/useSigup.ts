import { AxiosError } from "axios";
import useAuth from "../../api/auth";
import { Signup } from "../../types/auth";

const useSignup = () => {
  const { handleAuth } = useAuth();
  const handleSignup = async ({ email, password, authType }: Signup) => {
    try {
      const authResponse = await handleAuth({
        email,
        password,
        authType,
      });
      if (authResponse.status === 201) {
        alert("회원가입이 완료되었습니다.");
        window.location.replace("/signin");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`[ERROR] ${e.response?.data.message}`);
      }
    }
  };
  return handleSignup;
};
export default useSignup;
