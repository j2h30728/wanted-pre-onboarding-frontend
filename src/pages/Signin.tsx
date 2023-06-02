import useEmailInput from "../hooks/auth/useEmailInput";
import { Link } from "react-router-dom";
import usePasswordInput from "../hooks/auth/usePasswordInput";
import useSignin from "../hooks/auth/useSignin";
import { publicRoute } from "../hoc/publicRoute";

const Signin = publicRoute(() => {
  const { handleEmailInput, email, emailError } = useEmailInput();
  const { handlePassword, password, passwordError } = usePasswordInput();
  const { handleSignin, error } = useSignin();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignin({ email, password });
  };

  return (
    <div className="w-full">
      <h1 className="my-4 font-pacifico text-center text-3xl">LOGIN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-3">
        <div className="flex flex-col my-3 space-y-2">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleEmailInput}
            value={email}
            className={`p-2 rounded ${
              emailError || error ? "border border-red-500 border-solid" : ""
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
            placeholder="비밀번호를 입력해주세요."
            onChange={handlePassword}
            value={password}
            className={`p-2 rounded ${
              passwordError || error ? "border border-red-500 border-solid" : ""
            }`}
          />
          <p className={`${passwordError ? "text-red-500" : ""}`}>
            {passwordError}
          </p>
        </div>
        <button
          data-testid="signin-button"
          disabled={emailError || passwordError ? true : false}
          className="w-full my-3 h-9 bg-zinc-500 text-white rounded-md hover:bg-zinc-400 active:bg-red-900 disabled:bg-zinc-300">
          로그인
        </button>
      </form>
      <span>계정이 없으신가요?</span>
      <Link
        to="/signup"
        className="ml-4 cursor-pointer border-b-2 border-solid text-zinc-500 hover:text-zinc-400 active:text-red-800">
        회원가입
      </Link>
    </div>
  );
});
export default Signin;
