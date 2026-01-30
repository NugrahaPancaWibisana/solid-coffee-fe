import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import { Login } from "./pages/Login";
import Register from "./pages/Register";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="*"
        element={
          <div className="flex h-dvh items-center justify-center text-5xl font-bold">
            404 NOT FOUND
          </div>
        }
      />
    </Routes>
  );
}
