import { Link } from "react-router-dom";
import { getToken } from "../hooks/auth/useToken";

export default function Home() {
  const token = getToken();
  return (
    <div className="mt-40 h-full flex flex-col justify-start items-center">
      <h2 className="text-xl mb-20">TODO LIST를 만들어 보아요</h2>
      {token ? (
        <Link to="/todo">TODO LIST</Link>
      ) : (
        <div className="flex gap-10">
          <Link
            to="/signup"
            className="bg-zinc-500 p-2 text-white rounded-md hover:bg-zinc-400 active:bg-red-900">
            회원가입
          </Link>
          <Link
            to="/signin"
            className="bg-zinc-500 p-2 text-white rounded-md hover:bg-zinc-400 active:bg-red-900">
            로그인
          </Link>
        </div>
      )}
    </div>
  );
}
