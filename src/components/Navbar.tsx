import { Link } from "react-router-dom";
import { clearToken, getToken } from "../hooks/useToken";
import { useEffect } from "react";

const Navbar = () => {
  const token = getToken();
  useEffect(() => {
    console.log("test");
  }, [token]);

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
        <p onClick={handleLogout}>로그 아웃</p>
      ) : (
        <div>
          <Link to="/signup">회원 가입</Link>
          <Link to="/signin">로그인</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
