import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const UserDashboard = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* 🔹 Mobile Header */}
      <div className="max-w-6xl mx-auto lg:p-8 p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* 🔹 Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h1 className="text-xl md:text-2xl font-bold mb-2">
                Welcome back, {user.name} 👋
              </h1>
              <p className="text-gray-600">
                Manage your profile, orders and shipping details here.
              </p>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
