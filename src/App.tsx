import type{
 
  RouteObject,

} from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from './pages/userpages/homepage/HomePage'
const authRouter: RouteObject[] = [

];

const userRouter: RouteObject[] = [
  { path: "/home", element: <HomePage /> },

];

const router = createBrowserRouter([...authRouter, ...userRouter]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;