import React, { useState } from "react";

import DashboardIcon from "../../assets/adminDashborad/DashboardIcon.svg";
import ProductIcon from "../../assets/adminDashborad/ProductIcon.svg";
import OrderIcon from "../../assets/adminDashborad/Bag.svg";
import UserIcon from "../../assets/adminDashborad/UserIcon.svg";
import LogoutIcon from "../../assets/adminDashborad/LogoutIcon.svg";
import { Link } from "react-router";

function AdminDashboardMenu() {
  const [activeMenu, setActiveMenu] = useState(1);

  const handleMenuClick = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const menu = [
    { id: 1, name: "Dashboard", icon: DashboardIcon, path: "/dashboard/admin" },
    {
      id: 2,
      name: "Product",
      icon: ProductIcon,
      path: "/dashboard/admin/product-list",
    },
    {
      id: 3,
      name: "Order",
      icon: OrderIcon,
      path: "/dashboard/admin/order-list",
    },
    { id: 4, name: "User", icon: UserIcon, path: "/dashboard/admin/user-list" },
    { id: 5, name: "Keluar", icon: LogoutIcon, path: "/login" },
  ];
  return (
    <div className="hidden md:block md:p-5">
      <div className="flex flex-col items-center justify-center">
        {menu.map((item) => (
          <button
            isActive={activeMenu === item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`${activeMenu == item.id ? "bg-brand-orange" : "bg-white"} flex w-full items-center rounded-lg border-0 p-2`}
          >
            <Link to={item.path} className="flex w-full gap-3">
              <div>
                <img src={item.icon} alt={`${item.name}-icon`} className={`${activeMenu == item.id ? "brightness-0" : ""}`}/>
              </div>
              <div>
                <p className={`${activeMenu == item.id ? "brightness-0" : ""} text-gray-800`}>{item.name}</p>
              </div>
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardMenu;
