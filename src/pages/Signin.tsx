import useAuth from "../api/auth";
import { setToken } from "../hooks/useToken";
import { handleRedirectTodo } from "../hooks/useUser";
import useEmailInput from "../hooks/useEmailInput";
import usePasswordInput from "../hooks/usePasswordInput";
import { AxiosError } from "axios";

export default function Signin() {
  const { handleEmailInput, email, emailError } = useEmailInput();
  const { handlePassword, password, passwordError } = usePasswordInput();
  const { handleAuth: handleSignin } = useAuth();
  handleRedirectTodo();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!email || !password) throw new Error("잘못된 입력입니다.");
      const authResponse = await handleSignin({
        email,
        password,
        authType: "signin",
      });
      if (authResponse.status === 200) {
        const token = authResponse.data.access_token;
        setToken(token);
        window.location.replace("/todo");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        alert(`[ERROR] ${e.response?.data.message}`);
      }
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="EMAIL"
            onChange={handleEmailInput}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="PASSWORD"
            onChange={handlePassword}
            value={password}
          />
        </div>
        <button
          data-testid="signin-button"
          disabled={emailError || passwordError ? true : false}>
          로그인
        </button>
      </form>
    </div>
  );
}
