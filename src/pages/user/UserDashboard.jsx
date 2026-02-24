import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="min-h-screen bg-slate-100">
        {/* 🔹 Mobile / Tablet Header */}
        <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold">My Account</h1>
          <div></div>
        </div>

        <div className="max-w-6xl mx-auto lg:p-8 p-4">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* 🔹 Overlay (Mobile only) */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              ></div>
            )}

            {/* 🔹 Sidebar */}
            <div
              className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 lg:w-auto bg-white rounded-none lg:rounded-2xl shadow-md p-6 space-y-4 z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            >
              {/* Close Button (Mobile) */}
              <div className="flex justify-between items-center lg:hidden mb-4">
                <h2 className="text-xl font-bold">My Account</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <h2 className="text-xl font-bold hidden lg:block">My Account</h2>
                <Link to={'/'}>Home</Link>
              <button className="w-full text-left py-2 hover:text-teal-600">
                Dashboard
              </button>

              <button className="w-full text-left py-2 hover:text-teal-600">
                My Orders
              </button>

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

            {/* 🔹 Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Welcome Card */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  Welcome back, {user.name} 👋
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Manage your profile, orders and shipping details here.
                </p>
              </div>

              {/* Profile Info */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Profile Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Orders Section */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

                <div className="space-y-4">
                  <div className="border p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <p className="font-semibold">Order #12345</p>
                      <p className="text-sm text-gray-500">
                        Placed on 18 Feb 2026
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm w-fit">
                      Delivered
                    </span>
                  </div>

                  <div className="border p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <p className="font-semibold">Order #67890</p>
                      <p className="text-sm text-gray-500">
                        Placed on 12 Feb 2026
                      </p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm w-fit">
                      Processing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
