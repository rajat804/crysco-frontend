import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const { fetchCart } = useCart();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { token } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = async () => {
    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "Monster Store",
        description: "Order Payment",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            console.log("Payment Success:", response);

            const verifyRes = await fetch(`${BASE_URL}/api/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();
            console.log("Verify Response:", verifyData);

            if (!verifyRes.ok) {
              alert("Payment verification failed");
              return;
            }

            await fetchCart();
            navigate("/order-success");
          } catch (err) {
            console.log("Verification Error:", err);
            alert("Something went wrong after payment");
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            alert("Payment popup closed");
          },
        },

        prefill: {
          name: form.fullName,
          contact: form.phone,
        },

        theme: { color: "#10B981" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Create Order Error:", err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="space-y-4">
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
