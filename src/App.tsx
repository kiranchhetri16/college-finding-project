import type{
 
  RouteObject,

} from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from './pages/userpages/homepage/HomePage'
import CollegeCard from "./components/Cart";
import CollegeDetail from "./pages/CollegeDetailpage";

const authRouter: RouteObject[] = [
{path:"/collegedetail", element:<CollegeDetail />}
];

const userRouter: RouteObject[] = [
  { path: "/", element: <CollegeCard /> },

];

const router = createBrowserRouter([...authRouter, ...userRouter]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;