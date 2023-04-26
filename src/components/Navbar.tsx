import { clearToken } from "../util/useToken";
import useAuth from "../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLogined } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    const logoutConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (logoutConfirm) {
      clearToken();
      navigate("/signin");
    }
  };
  return (
    <>
      {isLogined ? (
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
