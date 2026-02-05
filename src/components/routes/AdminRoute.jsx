import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function AdminRoute() {
  const { isLogin, user } = useSelector((state) => state.login);

  if (!isLogin) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
