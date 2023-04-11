import useApi from "../useApi";
import { setToken } from "./useToken";
import { useEffect } from "react";
import { User } from "../../types/auth";
import { AxiosResponseType } from "../../types/api";

const useSignin = () => {
  const [reqest, { data, error }] = useApi<AxiosResponseType>();
  useEffect(() => {
    if (data) {
      setToken(data.access_token);
      window.location.replace("/todo");
    }
  }, [data]);

  const handleSignin = async ({ email, password }: User) => {
    try {
      if (!email || !password) throw new Error("잘못된 입력입니다.");
      reqest("post", `auth/signin`, { email, password });
    } catch (error) {
      alert(error);
    }
  };

  return { handleSignin, error };
};
export default useSignin;
