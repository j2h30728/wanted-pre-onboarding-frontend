import useAuth from "../api/auth";
import { setToken } from "../hooks/useToken";
import { handleRedirectTodo } from "../hooks/useUser";
import useEmailInput from "../hooks/useEmailInput";
import usePasswordInput from "../hooks/usePasswordInput";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

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
    <div className="w-full">
      <h1 className={authStyle.title}>LOGIN</h1>
      <form onSubmit={handleSubmit} className={authStyle.form}>
        <div className={authStyle.inputContainer}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleEmailInput}
            value={email}
            className={authStyle.input}
          />
        </div>
        <div className={authStyle.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handlePassword}
            value={password}
            className={authStyle.input}
          />
        </div>
        <button
          data-testid="signin-button"
          disabled={emailError || passwordError ? true : false}
          className={authStyle.button}>
          로그인
        </button>
      </form>
      <span>계정이 없으신가요?</span>
      <Link to="/signup" className={authStyle.otherLink}>
        회원가입
      </Link>
    </div>
  );
}
const authStyle = {
  title: "my-4 font-pacifico text-center text-3xl",
  form: "flex flex-col mt-3",
  inputContainer: "flex flex-col my-3 space-y-2",
  input: "p-2 rounded",
  button: "w-full my-3 bg-zinc-500 rounded h-9 text-stone-50",
  otherLink:
    "ml-4 cursor-pointer border-b-2 border-solid text-zinc-500 hover:text-zinc-400 active:text-red-800",
};
