import { Router } from "@remix-run/router";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Singup";
import Todo from "./pages/Todo";

const router: Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
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
        element: <Todo />,
      },
    ],
  },
]);

export default router;
