import { getToken } from "./useToken";

const useUser = () => {
  const isToken = getToken();

  const handleRedirectTodo = () => {
    if (isToken) {
      window.location.href = "/todo";
    }
  };
  const handleRedirectAuth = () => {
    if (!isToken) {
      window.location.href = "/signin";
    }
  };
  return { handleRedirectTodo, handleRedirectAuth };
};

export default useUser;
