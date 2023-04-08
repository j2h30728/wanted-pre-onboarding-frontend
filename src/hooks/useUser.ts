import useToken from "./useToken";

const useUser = () => {
  const { getToken } = useToken();
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
