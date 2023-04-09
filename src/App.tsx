import { Link, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-80 h-3/4 py-3 px-5 flex flex-col items-center bg-zinc-200	border-2 border-zinc-400 border-solid rounded-xl">
        <Link to="/" className="self-start font-pacifico text-m">
          TODO
        </Link>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
