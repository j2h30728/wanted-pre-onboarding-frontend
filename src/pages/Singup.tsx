import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";

export default function Signup() {
  const navigate = useNavigate();
  const { handleInput: handleEmail, input: email } = useInput();
  const { handleInput: handlePassword, input: password } = useInput();
  const { handleAuth: handleSignin } = useAuth();
  const validate =
    email.includes("@") && password.length >= 8 ? "valid" : "inValid";

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return alert("잘못된 입력입니다.");
    if (!email.includes("@")) return alert("이메일 형식을 지켜주십시오.");
    if (password.length < 8) return alert("비밀번호는 최소 8자 이상입니다.");

    try {
      const authResponse = await handleSignin({
        email,
        password,
        authType: "signup",
      });
      if (authResponse.statusText === "Created") navigate("/signin");
    } catch (error) {
      alert("중복된 이메일이 존재합니다.");
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="EMAIL"
            onChange={handleEmail}
          />
          <p>
            {email.length > 5 && !email.includes("@")
              ? "이메일 형식을 지켜주십시오"
              : null}
          </p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="PASSWORD"
            onChange={handlePassword}
          />
          <p>
            {password.length > 2 && password.length < 8
              ? "비밀번호는 최소 8자 이상입니다."
              : null}
          </p>
        </div>
        <button disabled={validate === "inValid"} data-testid="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
}
