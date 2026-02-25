import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/user/UserSidebar";

const MyCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [removingId, setRemovingId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  const updateQuantity = async (item, newQty) => {
    if (newQty < 1) return;

    await fetch(`${BASE_URL}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: newQty,
      }),
    });

    fetchCart();
  };

  const removeItem = async (item) => {
    setRemovingId(item.productId); // 👈 button ko loading mode me daalo

    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: item.productId,
          size: item.size,
          color: item.color,
        }),
      });

      await res.json();
      fetchCart();
    } catch (error) {
      console.log(error);
    } finally {
      setRemovingId(null); // 👈 loading hata do
    }
  };

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">My Cart</h2>

          {cart.items.length === 0 ? (
            <p>Your cart is empty 🛒</p>
          ) : (
            <>
              {cart.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-center border-b py-4 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="font-bold">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                      className="px-3 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item)}
                    disabled={removingId === item.productId}
                    className="text-red-500 hover:underline disabled:opacity-50"
                  >
                    {removingId === item.productId ? "Removing..." : "Remove"}
                  </button>
                </div>
              ))}

              <div className="mt-6 text-right">
                <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCart;
