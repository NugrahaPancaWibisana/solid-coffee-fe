import { Routes, Route } from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import CheckoutProduct from "./pages/CheckoutProduct";
import Profile from "./pages/Profile";
import DetailOrder from "./pages/DetailOrder";
import HistoryOrder from "./pages/HistoryOrder";

import { Login } from "./pages/Login";
import Register from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUserlist from "./pages/AdminUserlist";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";

export default function Router() {
  return (
    <Routes>
      {/* PUBLIC pakai MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>

      {/* PRIVATE USER */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="checkout-product" element={<CheckoutProduct />} />
          <Route path="order/detail" element={<DetailOrder />} />
          <Route path="order/history" element={<HistoryOrder />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* ADMIN */}
      <Route element={<AdminRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users-list" element={<AdminUserlist />} />
        </Route>
      </Route>

      {/* AUTH */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* 404 */}
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
