import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/orders/admin/all-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token, BASE_URL]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/orders/admin/update-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderStatus: newStatus }),
        }
      );

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id
              ? { ...order, orderStatus: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          All Orders
        </h2>

        <Link
          to="/admin/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">No Orders Found</p>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1600px] bg-slate-900 rounded-xl shadow-xl">
            <div className="w-full max-h-[75vh] overflow-x-auto overflow-y-auto">
              <table className="min-w-[1400px] text-sm text-left text-gray-300">
                <thead className="sticky top-0 z-20 bg-slate-800 text-gray-200 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Products</th>
                    <th className="px-4 py-3">Address</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Update</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-slate-700 hover:bg-slate-800 transition"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {order._id.slice(-6)}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {order.user?.name || "N/A"}
                        <br />
                        <span className="text-xs text-gray-400">
                          {order.user?.email}
                        </span>
                      </td>

                      {/* Products */}
                      <td className="px-4 py-3 max-w-[250px]">
                        {order.items?.map((item, i) => (
                          <div key={i} className="mb-2">
                            <p className="font-semibold">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity} | {item.size}
                            </p>
                          </div>
                        ))}
                      </td>

                      {/* Address */}
                      <td className="px-4 py-3 max-w-[250px] text-xs">
                        {order.shippingAddress?.fullName}
                        <br />
                        {order.shippingAddress?.city}
                        <br />
                        {order.shippingAddress?.pincode}
                      </td>

                      <td className="px-4 py-3 text-emerald-400 whitespace-nowrap">
                        ₹{order.totalAmount}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            order.status === "Paid"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-xs">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          value={order.orderStatus}
                          className="bg-slate-800 border border-slate-600 p-1 text-xs rounded"
                        >
                          <option>Processing</option>
                          <option>Confirmed</option>
                          <option>Shipped</option>
                          <option>Out for Delivery</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;