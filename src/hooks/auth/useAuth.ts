import { getToken } from "../../util/useToken";

export default function useAuth() {
  const token = getToken();
  const isLogined = token ? true : false;

  return { isLogined };
}
