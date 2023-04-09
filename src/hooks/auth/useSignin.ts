import { AxiosError } from "axios";
import useAuth from "../../api/auth";
import { Signup } from "../../types/auth";
import { setToken } from "./useToken";

const useSignin = () => {
  const { handleAuth } = useAuth();
  const handleSignin = async ({ email, password, authType }: Signup) => {
    try {
      const authResponse = await handleAuth({
        email,
        password,
        authType,
      });
      if (authResponse.status === 200) {
        const token = authResponse.data.access_token;
        setToken(token);
        window.location.replace("/todo");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`[ERROR] ${e.response?.data.message}`);
      }
    }
  };
  return handleSignin;
};
export default useSignin;
