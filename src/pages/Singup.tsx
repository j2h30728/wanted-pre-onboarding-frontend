import useEmailInput from "../hooks/auth/useEmailInput";
import { Link } from "react-router-dom";
import usePasswordInput from "../hooks/auth/usePasswordInput";
import useSignup from "../hooks/auth/useSignup";

export default function Signup() {
  const { handleEmailInput, email, emailError } = useEmailInput();
  const { handlePassword, password, passwordError } = usePasswordInput();
  const handleSignup = useSignup();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignup({ email, password });
  };

  return (
    <div className="w-full">
      <h1 className="my-4 font-pacifico text-center text-3xl">SIGN UP</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-3">
        <div className="flex flex-col my-3 space-y-2">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="이메일을 입력해주세요."
            required
            onChange={handleEmailInput}
            value={email}
            className={`p-2 rounded ${
              emailError ? "border border-red-500 border-solid" : ""
            }`}
          />
          <p className={`${emailError ? "text-red-500" : ""}`}>{emailError}</p>
        </div>
        <div className="flex flex-col my-3 space-y-2">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="최소 8자 이상 입력해주세요."
            required
            onChange={handlePassword}
            value={password}
            className={`p-2 rounded ${
              passwordError ? "border border-red-500 border-solid" : ""
            }`}
          />
          <p className={`${passwordError ? "text-red-500" : ""}`}>
            {passwordError}
          </p>
        </div>
        <button
          disabled={emailError || passwordError ? true : false}
          data-testid="signup-button"
          className="w-full my-3 h-9 bg-zinc-500 text-white rounded-md hover:bg-zinc-400 active:bg-red-900 disabled:bg-zinc-300">
          회원가입
        </button>
      </form>
      <span>계정이 있으신가요?</span>
      <Link
        to="/signin"
        className="ml-4 cursor-pointer border-b-2 border-solid text-zinc-500 hover:text-zinc-400 active:text-red-800">
        로그인
      </Link>
    </div>
  );
}
