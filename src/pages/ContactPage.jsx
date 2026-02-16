import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add form submission logic (API call or email)
    alert(
      `Thank you, ${formData.name}! We received your message. We will contact you soon.`
    );
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581092915369-66d4300f25f3?fit=crop&w=1400&q=80')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Contact Us
          </h1>
          <p className="text-white text-lg md:text-xl">
            We'd love to hear from you! Reach out for orders or inquiries.
          </p>
        </div>
      </div>

      {/* CONTACT INFO & FORM */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* CONTACT FORM */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
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
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Location</h2>
          <div className="w-full h-80 rounded overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.703619570359!2d72.98938527442284!3d19.22220294913225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7f6e6f7c4d5%3A0xc0f3a0c01a68e!2sMumbai!5e0!3m2!1sen!2sin!4v1617938448777!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              title="Company Location"
              className="border-0"
            ></iframe>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Phone:</strong>{" "}
              <a href="tel:+917982190064" className="text-[#06B6D4] hover:underline">
                +91 79821 90064
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong>{" "}
              <a href="mailto:info@shreeramrealtygroup.com" className="text-[#06B6D4] hover:underline">
                info@shreeramrealtygroup.com
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> Mumbai, Maharashtra, India
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917982190064?text=Hello!%20I%20want%20to%20contact%20you%20regarding%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white font-semibold rounded hover:opacity-90 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
