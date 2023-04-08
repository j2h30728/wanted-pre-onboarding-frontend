import { AxiosError } from "axios";
import useAuth from "../api/auth";
import usePasswordInput from "../hooks/usePasswordInput";
import useEmailInput from "../hooks/useEmailInput";
import { handleRedirectTodo } from "../hooks/useUser";

export default function Signup() {
  const { handleEmailInput, email, emailError } = useEmailInput();
  const { handlePassword, password, passwordError } = usePasswordInput();
  const { handleAuth: handleSignup } = useAuth();
  handleRedirectTodo();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!email || !password) throw new Error("잘못된 입력입니다.");
      const authResponse = await handleSignup({
        email,
        password,
        authType: "signup",
      });
      if (authResponse.status === 201) window.location.replace("/signin");
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`[ERROR] ${e.response?.data.message}`);
        console.log(e);
      }
    }
  };
  return (
    <div>
      <h1>회원가입</h1>
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
          <p>{emailError ? "이메일 형식을 지켜주십시오" : null}</p>
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
          <p>{passwordError ? "비밀번호는 최소 8자 이상입니다." : null}</p>
        </div>
        <button
          disabled={emailError || passwordError ? true : false}
          data-testid="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
}
