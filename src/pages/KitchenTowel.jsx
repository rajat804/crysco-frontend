import React from "react";
import ProductCard from "../components/ProductCard";
import kitchenBanner from "../assets/kitchenTowelBanner.png";
import kitchenTowel1 from "../assets/3.jpg";
import kitchenTowel2 from "../assets/4.jpg";

const KitchenTowel = () => {
  // Hero banner image URL
  const heroImageUrl = kitchenBanner; // replace with your kitchen towel image

  // Dummy product data
  const product = {
    name: "Premium Kitchen Towel",
    price: 199,
    oldPrice: 249,
    discount: 20,
    image1: kitchenTowel1,
    image2: kitchenTowel2,
  };

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Title */}
        {/* <h1 className="relative text-white text-4xl md:text-6xl font-bold text-center px-4">
          Kitchen Towels
        </h1> */}
      </section>

      {/* Page Content */}
      <section className="max-w-6xl mx-auto p-6">
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center">
          Discover our high-quality Kitchen Towels — soft, absorbent, and
          perfect for all your kitchen needs.
        </p>
      </section>

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

export default KitchenTowel;
