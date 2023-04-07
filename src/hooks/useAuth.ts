import axios from "axios";
const BASE_URL = "http://localhost:8000";

interface Signup {
  email: string;
  password: string;
  authType: "signup" | "signin";
}

const useAuth = () => {
  const handleAuth = async ({ email, password, authType }: Signup) =>
    await axios.post(
      BASE_URL + (authType === "signup" ? "/auth/signup" : "/auth/signin"),
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  return { handleAuth };
};
export default useAuth;
