import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const steps = [
    "Processing",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const getCurrentStepIndex = (status) => {
    return steps.indexOf(status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Confirmed":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-indigo-100 text-indigo-700";
      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [token, BASE_URL]);

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      const res = await fetch(
        `${BASE_URL}/api/orders/cancel/${orderId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "Cancelled" }
              : order
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        orders.map((order) => {
          const currentIndex = getCurrentStepIndex(order.orderStatus);

          return (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-2xl p-6 mb-8 border"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Payment: {order.status}
                  </p>
                </div>
              </div>

              {/* 🚚 Tracking Progress */}
              {order.orderStatus !== "Cancelled" ? (
                <div className="mt-6 mb-6">
                  <div className="flex items-center justify-between relative">
                    {steps.map((step, index) => {
                      const isCompleted = index <= currentIndex;

                      return (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center relative"
                        >
                          {index !== steps.length - 1 && (
                            <div
                              className={`absolute top-4 left-1/2 w-full h-1 ${
                                index < currentIndex
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          )}

                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold z-10
                              ${
                                isCompleted
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }`}
                          >
                            {isCompleted ? "✓" : index + 1}
                          </div>

                          <p
                            className={`mt-2 text-xs text-center ${
                              isCompleted
                                ? "text-green-600 font-semibold"
                                : "text-gray-400"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 font-semibold text-center">
                  This order has been cancelled.
                </div>
              )}

              {/* Products */}
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-t pt-4 mt-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} | Size: {item.size}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              {/* Total */}
              <div className="text-right mt-6 font-bold text-lg">
                Total: ₹{order.totalAmount}
              </div>

              {/* Cancel Button */}
              {order.orderStatus === "Processing" && (
                <div className="text-right mt-4">
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm transition"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;