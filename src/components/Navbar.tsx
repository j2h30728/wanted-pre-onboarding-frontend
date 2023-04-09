import { Link } from "react-router-dom";
import { clearToken, getToken } from "../hooks/useToken";
import { useEffect } from "react";

const Navbar = () => {
  const token = getToken();
  useEffect(() => {}, [token]);

  const handleLogout = () => {
    const logoutConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (logoutConfirm) {
      clearToken();
      window.location.replace("/signin");
    }
  };
  return (
    <>
      {token ? (
        <p
          onClick={handleLogout}
          className="absolute right-20 top-[125px] z-10 font-semibold text-sm text-zinc-500 cursor-pointer">
          로그아웃
        </p>
      ) : null}
    </>
  );
};

export default Navbar;

/**
 * (
        <div>
          <Link to="/signup" className="font-mono">
            회원 가입
          </Link>
          <Link to="/signin">로그인</Link>
        </div>
      )
 * 
 */
