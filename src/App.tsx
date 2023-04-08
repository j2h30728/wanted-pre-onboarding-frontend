import { Outlet } from "react-router-dom";
import useUser from "./hooks/useUser";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <h1>TODO</h1>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
