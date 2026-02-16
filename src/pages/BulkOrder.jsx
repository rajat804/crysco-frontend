import React, { useState } from "react";

const BulkOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the WhatsApp message
    const whatsappNumber = "917982190064"; // country code +91, no spaces
    const textMessage = `Hello! I want to place a bulk order.\n
Name: ${formData.name}\n
Email: ${formData.email}\n
Phone: ${formData.phone}\n
Product: ${formData.product}\n
Quantity: ${formData.quantity}\n
Message: ${formData.message}`;

    // Encode the message
    const encodedMessage = encodeURIComponent(textMessage);

    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

    // Optional: reset form
    setFormData({ name: "", email: "", phone: "", product: "", quantity: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Bulk Order Form</h2>

      <form onSubmit={handleSubmit} className="bg-[#f8fafc] p-8 rounded shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:ring-2 focus:ring-[#06B6D4]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:ring-2 focus:ring-[#06B6D4]"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:ring-2 focus:ring-[#06B6D4]"
          />
          <input
            type="text"
            name="product"
            placeholder="Product Name"
            value={formData.product}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:ring-2 focus:ring-[#06B6D4]"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="p-3 border rounded focus:ring-2 focus:ring-[#06B6D4]"
          />
        </div>

        <textarea
          name="message"
          placeholder="Additional Message (optional)"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded h-32 focus:ring-2 focus:ring-[#06B6D4]"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white py-3 rounded font-semibold hover:opacity-90 transition"
        >
          Submit Bulk Order via WhatsApp
        </button>
      </form>
    </div>
  );
};

export default BulkOrder;
