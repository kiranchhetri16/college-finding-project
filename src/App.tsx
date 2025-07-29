import type { RouteObject } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/userpages/homepage/Dashboard";
import Login from "./pages/userpages/authpages/Login";
import Signup from "./pages/userpages/authpages/Signup";
import Guide from "./pages/userpages/homepage/Guide";
const authRouter: RouteObject[] = [
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

const userRouter: RouteObject[] = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/guide", element: <Guide /> },
];

const router = createBrowserRouter([...authRouter, ...userRouter]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
