import { getToken } from "../../util/useToken";

const token = getToken();

export const handleRedirectTodo = () => {
  if (token) {
    window.location.href = "/todo";
  }
};
export const handleRedirectAuth = () => {
  if (!token) {
    window.location.href = "/signin";
  }
};
