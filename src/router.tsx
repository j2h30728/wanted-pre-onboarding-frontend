import { Router } from "@remix-run/router";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Singup";
import Todos from "./pages/Todos";
import PrivateRoute from "./components/PrivateRoute";

const router: Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/todo",
        element: <PrivateRoute route={Todos} />,
      },
    ],
  },
]);

export default router;
