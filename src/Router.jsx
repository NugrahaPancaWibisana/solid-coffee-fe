import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
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
