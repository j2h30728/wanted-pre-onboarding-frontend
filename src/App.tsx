import { Outlet } from "react-router-dom";
import useUser from "./hooks/useUser";

function App() {
  return (
    <div>
      <h1>Home</h1>
      <Outlet />
    </div>
  );
}

export default App;
