import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const MyCart = () => {
  const { fetchCart } = useCart();
  const [cart, setCart] = useState({ items: [] });
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();
  const { setCartCount } = useCart();
  const [updatingId, setUpdatingId] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user, token } = useAuth();

 useEffect(() => {
  if (!user || !token) {
    setCart({ items: [] });
    return;
  }

  const load = async () => {
    setCart({ items: [] }); // 🔥 clear old user cart immediately

    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCart(data);

      const totalQty = data.items?.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      setCartCount(totalQty || 0);
    } catch (err) {
      console.log(err);
    }
  };

  load();
}, [user, token]);

  const loadCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCart(data);

      // 🔥 Global badge update
      const totalQty = data.items?.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );

      setCartCount(totalQty || 0);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  const updateQuantity = async (item, newQty) => {
    if (newQty < 1) return;
    setUpdatingId(item.productId);
    try {
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

      loadCart(); // refresh + badge update
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingId(null); // 🔥 stop loading
    }
  };

  const removeItem = async (item) => {
    setRemovingId(item.productId);

    try {
      await fetch(`${BASE_URL}/api/cart`, {
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
      await fetchCart();
      loadCart(); // refresh + badge update
    } catch (error) {
      console.log(error);
    } finally {
      setRemovingId(null);
    }
  };

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">My Cart</h2>

          {cart.items.length === 0 ? (
            <p>Your cart is empty 🛒</p>
          ) : (
            <>
              {cart.items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
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
                      disabled={updatingId === item.productId}
                      className={`px-3 py-1 border rounded transition 
  ${
    updatingId === item.productId
      ? "opacity-50 cursor-not-allowed"
      : "hover:bg-gray-100"
  }`}
                    >
                      {updatingId === item.productId ? "..." : "-"}
                    </button>

                    <span className="px-2">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      disabled={updatingId === item.productId}
                      className={`px-3 py-1 border rounded transition 
  ${
    updatingId === item.productId
      ? "opacity-50 cursor-not-allowed"
      : "hover:bg-gray-100"
  }`}
                    >
                      {updatingId === item.productId ? "..." : "+"}
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

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCart;
