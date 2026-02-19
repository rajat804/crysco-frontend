import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

const AdminTopbar = ({ setSidebarOpen }) => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminInfo"));
    if (adminData) {
      setAdminName(adminData.name);
    }
  }, []);

  return (
    <div className="flex justify-between items-center bg-slate-900 px-6 py-4 border-b border-slate-800">

      <button
        className="md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg md:text-xl font-semibold">
        Welcome, {adminName || "Admin"} 👋
      </h1>

    </div>
  );
};

export default AdminTopbar;
