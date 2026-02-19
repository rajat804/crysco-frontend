import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  X,
  LogOut,
} from "lucide-react";

const AdminSidebar = ({ setSidebarOpen }) => {
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    window.location.href = "/admin/login";
  };

  return (
    <div className="w-64 h-full bg-slate-900 p-5 flex flex-col justify-between">

      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-emerald-500">
            Admin Panel
          </h2>

          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <NavLink to="/admin/dashboard" className={({ isActive }) =>
          `${linkStyle} ${
            isActive ? "bg-slate-700 text-emerald-400" : "hover:bg-slate-800"
          }`
        }>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={({ isActive }) =>
          `${linkStyle} ${
            isActive ? "bg-slate-700 text-emerald-400" : "hover:bg-slate-800"
          }`
        }>
          <Package size={20} />
          Products
        </NavLink>

        <NavLink to="/admin/orders" className={({ isActive }) =>
          `${linkStyle} ${
            isActive ? "bg-slate-700 text-emerald-400" : "hover:bg-slate-800"
          }`
        }>
          <ShoppingCart size={20} />
          Orders
        </NavLink>

        <NavLink to="/admin/users" className={({ isActive }) =>
          `${linkStyle} ${
            isActive ? "bg-slate-700 text-emerald-400" : "hover:bg-slate-800"
          }`
        }>
          <Users size={20} />
          Users
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-emerald-600 px-4 py-3 rounded-lg hover:bg-emerald-700 transition"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
};

export default AdminSidebar;
