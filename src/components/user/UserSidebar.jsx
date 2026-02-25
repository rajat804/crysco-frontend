import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const UserSidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {

    const handleLinkClick = () => {
  setSidebarOpen(false);
};

  return (
    <>
      {/* 🔹 Overlay (Mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`
    fixed lg:static top-0 left-0 h-full lg:h-auto w-64
    bg-white lg:rounded-2xl shadow-md p-6 space-y-4 z-50
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-xl font-bold">My Account</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <h2 className="text-xl font-bold hidden lg:block">My Account</h2>

        <Link to="/" onClick={handleLinkClick} className="block py-2 hover:text-teal-600">
          Home
        </Link>

        <Link to="/user/dashboard" onClick={handleLinkClick} className="block py-2 hover:text-teal-600">
          Dashboard
        </Link>

        <Link to="/user/mycart" onClick={handleLinkClick} className="block py-2 hover:text-teal-600">
          My Cart
        </Link>

        <button className="w-full text-left py-2 hover:text-teal-600">
          Address Book
        </button>

        <button className="w-full text-left py-2 hover:text-teal-600">
          Account Details
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left py-2 text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default UserSidebar;