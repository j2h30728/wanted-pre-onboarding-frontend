import { useEffect } from "react";
import { clearToken, getToken } from "../util/useToken";

const Navbar = () => {
  const token = getToken();
  useEffect(() => {}, [token]);

  const handleLogout = () => {
    const logoutConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (logoutConfirm) {
      clearToken();
      // window.location.replace("/signin");
    }
  };
  return (
    <>
      {token ? (
        <p
          onClick={handleLogout}
          className="relative left-28 bottom-5 z-10 font-semibold text-sm text-zinc-500 cursor-pointer">
          로그아웃
        </p>
      ) : null}
    </>
  );
};

export default Navbar;
