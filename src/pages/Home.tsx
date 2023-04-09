import { Link } from "react-router-dom";
import { getToken } from "../hooks/useToken";

export default function Home() {
  const token = getToken();
  return (
    <div>
      <h2>TODO LIST를 만들어 보아요</h2>
      {token ? (
        <Link to="/todo">TODO LIST</Link>
      ) : (
        <div>
          <Link to="/signup">회원가입</Link>
          <Link to="/signin">로그인</Link>
        </div>
      )}
    </div>
  );
}
