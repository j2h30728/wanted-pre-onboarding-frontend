import useApi from "../useApi";
import { setToken } from "../../util/useToken";
import { useEffect } from "react";
import { User } from "../../types/auth";
import { useNavigate } from "react-router-dom";

const useSignin = () => {
  const [reqest, { data, error }] = useApi<User>();
  const nav = useNavigate();
  useEffect(() => {
    if (data) {
      setToken(data.access_token);
      nav("/todo");
    }
  }, [data, nav]);

  const handleSignin = async ({ email, password }: User) => {
    try {
      if (!email || !password) throw new Error("잘못된 입력입니다.");
      reqest("post", `auth/signin`, { email, password });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return { handleSignin, error };
};
export default useSignin;
