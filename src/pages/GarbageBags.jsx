import React from "react";
import ProductCard from "../components/ProductCard";
import img5 from "../assets/yello1.jpg";
import img6 from "../assets/yello2.jpg";
import garbageInner from "../assets/garbageBagsBanner2.png";

const GarbageBags = () => {
  // Hero banner image URL
  const heroImageUrl = garbageInner;

  // Dummy product data
  const product = {
    name: "Premium Garbage Bag",
    price: 299,
    oldPrice: 399,
    discount: 25,
    image1: img5,
    image2: img6,
  };

  return (
    <>
    {/* <div className="w-full min-h-screen flex flex-col"> */}
      {/* Hero Banner */}
      <section
        className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroImageUrl}')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Title */}
        {/* <h1 className="relative text-white text-4xl md:text-6xl font-bold text-center px-4">
          Garbage Bags
        </h1> */}
      </section>

      {/* Page Content */}
      <section className="max-w-6xl mx-auto p-6">
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center">
          Explore our premium range of Garbage Bags, durable, eco-friendly, and
          perfect for all your needs.
        </p>
      </section>
    {/* </div> */}
    {/* Products Section */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Render ProductCard */}
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
        </div>
      </section>
      </>
  );
};

export default GarbageBags;
