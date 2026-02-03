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

export default function Router() {
  return (
    <Routes>

      {/*Semua halaman user pakai 1 layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="checkout-product" element={<CheckoutProduct />} />

        <Route path="order/detail" element={<DetailOrder />} />
        <Route path="order/history" element={<HistoryOrder />} />

        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Dashboard admin layout terpisah */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/users-list" element={<AdminUserlist />} />
      </Route>

      {/* Auth tanpa navbar */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

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
