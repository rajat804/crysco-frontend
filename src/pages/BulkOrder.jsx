import React, { useState } from "react";
import PromoCTA from "../components/PromoCTA";
import { motion } from "framer-motion";
import {
  PackageCheck,
  Truck,
  Building2,
  PhoneCall,
  Mail,
  Send,
} from "lucide-react";
import assets from "../assets/assets";

const BulkOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    size: "",
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
Size: ${formData.size}\n
Quantity: ${formData.quantity}\n
Message: ${formData.message}`;

    // Encode the message
    const encodedMessage = encodeURIComponent(textMessage);

    // Open WhatsApp
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
    );

    // Optional: reset form
    setFormData({
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
    <>
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-teal-600 to-cyan-600 py-28 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Bulk Product Inquiry & Sample Request
          </h1>
          <p className="max-w-3xl mx-auto text-teal-100 text-lg">
            Request samples, discuss bulk pricing, custom specifications, or
            long-term supply — we're here to support your business needs.
          </p>
        </motion.div>
      </section>
      

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: PackageCheck,
                title: "Check Quality First",
                desc: "Order samples to feel material, thickness & absorbency before bulk.",
              },
              {
                icon: Building2,
                title: "Custom Solutions",
                desc: "Request custom sizes, thickness, packaging or private labelling.",
              },
              {
                icon: Truck,
                title: "Fast & Reliable",
                desc: "Quick sample dispatch + dedicated support for bulk orders.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition"
              >
                <item.icon size={36} className="mx-auto mb-4 text-teal-600" />
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= WHOLESALER & BULK VISUALS ================= */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Bulk Production & Supply
            </h2>
            <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
              Designed for distributors, wholesalers, hotels, institutions, and
              large-scale buyers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[460px] rounded-3xl overflow-hidden shadow-xl bg-black"
            >
              <video
                src={assets.sampleVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px]"
            >
              {[
                assets.sampleImg1,
                assets.sampleImg2,
                assets.sampleImg3,
                assets.sampleImg4,
                assets.sampleImg5,
                assets.sampleImg6,
              ].map((img, index) => (
                <div
                  key={index}
                  className="w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white"
                >
                  <img
                    src={img}
                    alt={`Bulk supply example ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Bulk Order Form</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#f8fafc] p-8 rounded shadow-lg space-y-4"
        >
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
              type="text"
              name="size"
              placeholder="Product Size"
              value={formData.size}
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
      <PromoCTA />
    </>
  );
};

export default BulkOrder;
