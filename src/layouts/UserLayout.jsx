import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const UserLayout = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* 🔹 Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-white shadow p-4">
        <h1 className="text-lg font-bold">My Account</h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto lg:p-8 p-4 grid lg:grid-cols-4 gap-6">
        <UserSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />

        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
