import { useState } from "react";

const BuyNowModal = ({ product, isOpen, onClose, token, BASE_URL }) => {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  if (!isOpen) return null;

  const handleBuyNow = async () => {
  if (!size) return alert("Select size");

  const res = await fetch(`${BASE_URL}/api/buy-now/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product: {
        _id: product._id,
        title: product.title,
        price: product.salePrice,
        size,
        image: product.images[0],
      },
      quantity,
    }),
  });

  const data = await res.json();

  const options = {
    key: data.key, // ✅ backend se aa rahi
    amount: data.amount,
    currency: data.currency,
    order_id: data.orderId,
    name: "Monster Store",
    description: "Buy Now Payment",

    handler: async function (response) {
      await fetch(`${BASE_URL}/api/buy-now/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...response,
          product: {
            _id: product._id,
            title: product.title,
            price: product.salePrice,
            size,
            image: product.images[0],
          },
          quantity,
          shippingAddress,
        }),
      });

      alert("Order Placed Successfully");
      window.location.href = "/my-orders";
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] p-6 rounded-xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Buy Now</h2>

        <img src={product.images[0]} className="w-24 h-24 object-cover mb-4" />

        <p className="font-semibold">{product.title}</p>
        <p className="text-lg font-bold mb-4">₹{product.salePrice}</p>

        {/* Size */}
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="">Select Size</option>
          {product.sizes.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border p-2 rounded mb-3"
        />

        {/* Shipping */}
        <input
          placeholder="Full Name"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              fullName: e.target.value,
            })
          }
        />
        <input
          placeholder="Phone"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              phone: e.target.value,
            })
          }
        />
        <input
          placeholder="Address"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              address: e.target.value,
            })
          }
        />
        <input
          placeholder="City"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              city: e.target.value,
            })
          }
        />
        <input
          placeholder="Pincode"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) =>
            setShippingAddress({
              ...shippingAddress,
              pincode: e.target.value,
            })
          }
        />

        <button
          onClick={handleBuyNow}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default BuyNowModal;
