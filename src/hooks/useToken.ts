const useToken = () => {
  const getToken = () => {
    window.localStorage.getItem("token");
  };
  const setToken = (token: string) => {
    window.localStorage.setItem("token", token);
  };
  const clearToken = () => {
    window.localStorage.removeItem("token");
  };
  return { getToken, setToken, clearToken };
};

export default useToken;
