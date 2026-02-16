import React from "react";
import garbageImg from "../assets/yello3.jpg";
import kitchenTowelImg from "../assets/3.jpg";
import KitchenTissueImg from "../assets/9.jpg";
import bulkImg from "../assets/6.jpg";



const products = [
  {
    name: "Garbage Bags",
    description:
      "Durable, eco-friendly garbage bags designed for home and office use. Strong and reliable for everyday needs.",
    image: garbageImg,
    link: "/garbage-bags",
  },
  {
    name: "Kitchen Towel",
    description:
      "Soft and absorbent kitchen towels that make cleaning effortless, hygienic, and fast.",
    image: kitchenTowelImg,
    link: "/kitchen-towel",
  },
  {
    name: "Kitchen Tissue Roll",
    description:
      "Premium quality kitchen tissue rolls for daily use, strong and hygienic for all purposes.",
    image: KitchenTissueImg,
    link: "/kitchen-tissue",
  },
  {
    name: "Bulk Order",
    description:
      "Flexible bulk order options for businesses, restaurants, or large households. Quick delivery guaranteed.",
    image: bulkImg,
    link: "/bulk-order",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Anita Singh",
    review:
      "Excellent quality products and timely delivery! Their kitchen towels and garbage bags are my go-to now.",
  },
  {
    name: "Rohit Verma",
    review:
      "I placed a bulk order for my office and the service was outstanding. Highly recommended!",
  },
  {
    name: "Neha Sharma",
    review:
      "Premium quality kitchen tissue and towels. They really make daily cleaning so easy!",
  },
];

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* HERO BANNER */}
      <div
        className="w-full h-[350px] md:h-[450px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582719478170-6f20c0735c4c?fit=crop&w=1400&q=80')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            About Us
          </h1>
          <p className="text-white text-lg md:text-2xl">
            Delivering high-quality kitchen and household products with care.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
        {/* BRAND STORY */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Story
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Founded with a vision to make daily household chores easier and cleaner, our brand focuses on providing top-quality garbage bags, kitchen towels, kitchen tissue rolls, and flexible bulk order solutions. We have built our reputation on trust, reliability, and attention to detail. Every product is carefully sourced and designed to meet the highest standards of quality.
          </p>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            We serve thousands of households, restaurants, and businesses, helping them maintain cleanliness and convenience in daily life. Our mission is to combine functionality, durability, and eco-friendliness in every product.
          </p>
        </div>

        {/* MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Our Mission</h3>
            <p className="text-gray-700">
              To provide reliable, durable, and eco-friendly kitchen and household products that simplify daily tasks for every home and business.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Our Vision</h3>
            <p className="text-gray-700">
              To become the most trusted household products brand known for quality, reliability, and customer satisfaction across India.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#06B6D4] text-white p-6 rounded shadow text-center hover:scale-105 transition">
            <h3 className="font-bold text-xl mb-2">Premium Quality</h3>
            <p>Durable, tested products for everyday household needs.</p>
          </div>
          <div className="bg-[#0EA5E9] text-white p-6 rounded shadow text-center hover:scale-105 transition">
            <h3 className="font-bold text-xl mb-2">Eco-Friendly</h3>
            <p>Environmentally responsible products designed to minimize waste.</p>
          </div>
          <div className="bg-[#0284C7] text-white p-6 rounded shadow text-center hover:scale-105 transition">
            <h3 className="font-bold text-xl mb-2">Customer Satisfaction</h3>
            <p>We prioritize your satisfaction and provide the best support.</p>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Our Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <a
                key={index}
                href={product.link}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-200 text-sm">{product.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                <p className="text-gray-700 mb-4">"{item.review}"</p>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="text-center mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Place Your Order Today
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Chat with us directly on WhatsApp to order your preferred products or bulk items.
          </p>
          <a
            href="https://wa.me/917982190064?text=Hello!%20I%20want%20to%20place%20an%20order%20or%20know%20more%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white font-semibold rounded hover:opacity-90 transition"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
