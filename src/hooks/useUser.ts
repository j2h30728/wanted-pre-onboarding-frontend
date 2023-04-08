import { getToken } from "./useToken";

const useUser = () => {
  const token = getToken();

  const handleRedirectTodo = () => {
    if (token) {
      window.location.href = "/todo";
    }
  };
  const handleRedirectAuth = () => {
    if (!token) {
      window.location.href = "/signin";
    }
  };
  return { handleRedirectTodo, handleRedirectAuth };
};

export default useUser;
