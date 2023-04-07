import useToken from "./useToken";

const useUser = () => {
  const { getToken } = useToken();
  const isToken = getToken();

  const handleRedirectTodo = () => {
    if (isToken) {
      window.location.href = "/todo";
    }
  };
  return { handleRedirectTodo };
};

export default useUser;
