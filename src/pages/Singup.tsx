import { AxiosError } from "axios";
import useAuth from "../api/auth";
import usePasswordInput from "../hooks/usePasswordInput";
import useEmailInput from "../hooks/useEmailInput";
import { handleRedirectTodo } from "../hooks/useUser";
import { Link } from "react-router-dom";

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
    <div className="w-full">
      <h1 className={authStyle.title}>SIGN IN</h1>
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
          <p>{emailError ? "이메일 형식을 지켜주십시오" : null}</p>
        </div>
        <div className={authStyle.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="최소 8자 이상 입력해주세요."
            onChange={handlePassword}
            value={password}
            className={authStyle.input}
          />
          <p>{passwordError ? "비밀번호는 최소 8자 이상입니다." : null}</p>
        </div>
        <button
          disabled={emailError || passwordError ? true : false}
          data-testid="signup-button"
          className={authStyle.button}>
          회원가입
        </button>
      </form>
      <span>계정이 있으신가요?</span>
      <Link to="/signin" className={authStyle.otherLink}>
        로그인
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
