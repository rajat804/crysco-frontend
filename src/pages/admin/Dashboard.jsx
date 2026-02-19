import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminAuth } from "../../utils/auth";
import AdminLayout from "../../components/admin/AdminLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAuth(navigate);
  }, [navigate]);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Sales */}
        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300">
          <h3 className="text-gray-400 text-sm">Total Sales</h3>
          <p className="text-2xl font-bold mt-2 text-emerald-400">
            ₹ 1,20,000
          </p>
        </div>

        {/* Orders */}
        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300">
          <h3 className="text-gray-400 text-sm">Total Orders</h3>
          <p className="text-2xl font-bold mt-2 text-blue-400">
            320
          </p>
        </div>

        {/* Products */}
        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300">
          <h3 className="text-gray-400 text-sm">Products</h3>
          <p className="text-2xl font-bold mt-2 text-yellow-400">
            85
          </p>
        </div>

        {/* Users */}
        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300">
          <h3 className="text-gray-400 text-sm">Users</h3>
          <p className="text-2xl font-bold mt-2 text-pink-400">
            540
          </p>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
