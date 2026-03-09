import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const { cartItems, cartTotal, fetchCart } = useCart(); // ✅ added cartItems & cartTotal
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { token, user } = useAuth(); // ✅ get email if needed

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.fullName.trim()) return alert("Enter full name") || false;
    if (!/^[6-9]\d{9}$/.test(form.phone))
      return alert("Enter valid 10 digit phone number") || false;
    if (!form.address.trim()) return alert("Enter address") || false;
    if (!form.city.trim()) return alert("Enter city") || false;
    if (form.pincode.length !== 6) return alert("Enter valid pincode") || false;
    return true;
  };

  const checkPincode = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/payment/check-pincode`, { // ✅ fixed endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode: form.pincode }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Delivery not available on this pincode");
        return false;
      }
      return true;
    } catch (error) {
      console.log("Pincode Check Error:", error);
      alert("Unable to check delivery for this pincode");
      return false;
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    if (!(await checkPincode())) return;

    try {
      setLoading(true);

      // 1️⃣ Create Razorpay order
      const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: cartTotal }),
      });
      const data = await res.json();

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ from env
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Monster Store",
        description: "Order Payment",
        handler: async function (response) {
          // 2️⃣ Create shipment after payment success
          await fetch(`${BASE_URL}/api/payment/create-shipment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.order.id,
              fullName: form.fullName,
              phone: form.phone,
              address: form.address,
              city: form.city,
              pincode: form.pincode,
              items: cartItems,
              totalAmount: cartTotal,
            }),
          });

          // 3️⃣ Clear cart and redirect
          await fetchCart();
          navigate("/order-success");
        },
        prefill: {
          name: form.fullName,
          contact: form.phone,
          email: user?.email || "",
        },
        theme: { color: "#000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Payment Error:", err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="space-y-4">
        {["fullName", "phone", "address", "city", "pincode"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={handleChange}
            maxLength={field === "phone" ? 10 : undefined}
            className="w-full border p-2"
          />
        ))}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;