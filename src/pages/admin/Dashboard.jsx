import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminAuth } from "../../utils/auth";
import AdminLayout from "../../components/admin/AdminLayout";
import { Link } from "react-router-dom";

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300">
          <h3 className="text-gray-400 text-sm">Total Sales</h3>
          <p className="text-2xl font-bold mt-2 text-emerald-400">
            ₹ 1,20,000
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300">
          <h3 className="text-gray-400 text-sm">Total Orders</h3>
          <p className="text-2xl font-bold mt-2 text-blue-400">
            320
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300">
          <h3 className="text-gray-400 text-sm">Products</h3>
          <p className="text-2xl font-bold mt-2 text-yellow-400">
            85
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition duration-300">
          <h3 className="text-gray-400 text-sm">Users</h3>
          <p className="text-2xl font-bold mt-2 text-pink-400">
            540
          </p>
        </div>

      </div>

      {/* Show Products & Videos Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Show Products */}
        <Link
          to="/admin/products-show"
          className="block bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
        >
          <h3 className="text-xl font-semibold">Show Products</h3>
          <p className="text-sm mt-2 opacity-80">
            View, manage and edit all products
          </p>
        </Link>

        {/* Show Videos */}
        <Link
          to="/admin/videos"
          className="block bg-gradient-to-r from-pink-600 to-purple-600 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
        >
          <h3 className="text-xl font-semibold">Show Videos</h3>
          <p className="text-sm mt-2 opacity-80">
            View, manage and edit all videos
          </p>
        </Link>

      </div>

    </AdminLayout>
  );
};

export default Dashboard;
