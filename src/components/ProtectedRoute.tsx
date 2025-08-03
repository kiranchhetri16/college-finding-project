// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLogin = localStorage.getItem("isLogin");

  if (isLogin !== "1") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
