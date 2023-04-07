import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import useAuth from "../hooks/useAuth";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";

export default function Signin() {
  const navigate = useNavigate();
  const { handleInput: handleEmail, input: email } = useInput();
  const { handleInput: handlePassword, input: password } = useInput();
  const { handleAuth: handleSignin } = useAuth();
  const { setToken } = useToken();
  const { handleRedirectTodo } = useUser();
  handleRedirectTodo();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return alert("잘못된 입력입니다.");
    if (!email.includes("@")) return alert("이메일 형식을 지켜주십시오.");
    if (password.length < 8) return alert("비밀번호는 최소 8자 이상입니다.");
    try {
      const authResponse = await handleSignin({
        email,
        password,
        authType: "signin",
      });
      if (authResponse.status === 200) {
        const token = authResponse.data.access_token;
        setToken(token);
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
      alert("이메일 혹은 비밀번호를 확인부탁드립니다.");
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
            onChange={handleEmail}
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
          />
        </div>
        <button data-testid="signin-button">로그인</button>
      </form>
    </div>
  );
}
