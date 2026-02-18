import React, { useState } from "react";

const ContactPage = () => {

  /* ================= CONTACT FORM STATE ================= */
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    alert(
      `Thank you, ${contactData.name}! We received your message. We will contact you soon.`,
    );

    setContactData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  /* ================= BULK ORDER FORM STATE ================= */
  const [bulkData, setBulkData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    size: "",
    quantity: "",
    message: "",
  });

  const handleBulkChange = (e) => {
    setBulkData({ ...bulkData, [e.target.name]: e.target.value });
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "917982190064";

    const textMessage = `Hello! I want to place a bulk order.

Name: ${bulkData.name}
Email: ${bulkData.email}
Phone: ${bulkData.phone}
Product: ${bulkData.product}
Size: ${bulkData.size}
Quantity: ${bulkData.quantity}
Message: ${bulkData.message}`;

    const encodedMessage = encodeURIComponent(textMessage);

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );

    setBulkData({
      name: "",
      email: "",
      phone: "",
      product: "",
      size: "",
      quantity: "",
      message: "",
    });
  };

  return (
    <div className="w-full">

      {/* ================= CONTACT HERO SECTION ================= */}
      <section className="relative w-full h-[380px] md:h-[480px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">
            Contact Us
          </h1>

          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8">
            We'd love to hear from you! Whether it's bulk orders,
            customization, or general inquiries — our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* ================= CONTACT INFO & FORM ================= */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* CONTACT FORM */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Get in Touch
          </h2>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contactData.name}
              onChange={handleContactChange}
              required
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#06B6D4]"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={contactData.email}
              onChange={handleContactChange}
              required
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#06B6D4]"
            />

            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={contactData.phone}
              onChange={handleContactChange}
              required
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#06B6D4]"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={contactData.message}
              onChange={handleContactChange}
              required
              rows={5}
              className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#06B6D4]"
            />

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white font-semibold rounded hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* LOCATION & INFO */}
        <div className="space-y-8">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-800">Our Location</h2>

          {/* Map */}
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4618179060403!2d77.37571009999999!3d28.675828900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb356013cd8f%3A0x5a9a6e5ea8ca5633!2sTrikaya%20Fashion%20India%20(Crysco)!5e0!3m2!1sen!2sin!4v1771309759290!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="Google Map"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
            <p className="text-gray-700">
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+917982190064"
                className="text-cyan-500 font-medium hover:underline"
              >
                +91-7982190064
              </a>
              {", "}
              <a
                href="tel:+919990955454"
                className="text-cyan-500 font-medium hover:underline"
              >
                +91-9990955454
              </a>
            </p>

            <p className="text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@cryscoindia.com"
                className="text-cyan-500 font-medium hover:underline"
              >
                info@cryscoindia.com
              </a>
              {", "}
              <a
                href="mailto:sales@cryscoindia.com"
                className="text-cyan-500 font-medium hover:underline"
              >
                sales@cryscoindia.com
              </a>
            </p>

            <p className="text-gray-700">
              <strong>Address:</strong> Plot No.27 Gali No.3 Rajendra Nagar
              Industrial Area Ghaziabad Uttar Pradesh 201007
            </p>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/917982190064?text=Hello!%20I%20want%20to%20contact%20you%20regarding%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ================= BULK ORDER FORM ================= */}
      <div className="bg-gray-100">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Bulk Order Form
          </h2>

          <form
            onSubmit={handleBulkSubmit}
            className="bg-white p-8 rounded shadow-lg space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={bulkData.name}
                onChange={handleBulkChange}
                required
                className="p-3 border rounded"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={bulkData.email}
                onChange={handleBulkChange}
                required
                className="p-3 border rounded"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={bulkData.phone}
                onChange={handleBulkChange}
                required
                className="p-3 border rounded"
              />

              <input
                type="text"
                name="product"
                placeholder="Product Name"
                value={bulkData.product}
                onChange={handleBulkChange}
                required
                className="p-3 border rounded"
              />

              <input
                type="text"
                name="size"
                placeholder="Product Size"
                value={bulkData.size}
                onChange={handleBulkChange}
                required
                className="p-3 border rounded"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={bulkData.quantity}
                onChange={handleBulkChange}
                required
                className="p-3 border rounded"
              />
            </div>

            <textarea
              name="message"
              placeholder="Additional Message"
              value={bulkData.message}
              onChange={handleBulkChange}
              className="w-full p-3 border rounded h-32"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white py-3 rounded font-semibold hover:opacity-90 transition"
            >
              Submit Bulk Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
