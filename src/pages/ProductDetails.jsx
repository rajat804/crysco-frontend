import React, { useState } from "react";
import productImg1 from "../assets/yello1.jpg";
import productImg2 from "../assets/yello2.jpg";
import productImg3 from "../assets/yello3.jpg";


// Dummy product data (replace with API later)
const productData = {
  name: "Premium Kitchen Towel",
  brand: "Crysco Essentials",
  price: 199,
  oldPrice: 249,
  discount: 20,
  description:
    "High-quality, soft, and absorbent kitchen towel. Perfect for drying dishes, hands, and kitchen surfaces. Durable and long-lasting.",
  highlights: [
    "Soft & absorbent",
    "Durable & long-lasting",
    "Easy to clean",
    "Available in multiple sizes",
  ],
  images: [
    productImg1,
    productImg2,
    productImg3,
  ],
  sizes: ["Small", "Medium", "Large"],
};

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(productData.images[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: Images */}
        <div className="flex-1">
          <div className="w-full h-96 md:h-[500px] rounded overflow-hidden shadow-lg">
            <img
              src={mainImage}
              alt={productData.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Thumbnail images */}
          <div className="flex gap-4 mt-4 overflow-x-auto">
            {productData.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${productData.name} ${idx}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  mainImage === img ? "border-[#06B6D4]" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {productData.name}
          </h1>
          <p className="text-gray-500 text-sm">Brand: {productData.brand}</p>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-gray-800">
              ₹{productData.price}
            </span>
            <span className="line-through text-gray-400">
              ₹{productData.oldPrice}
            </span>
            <span className="text-[#06B6D4] font-semibold">
              {productData.discount}% OFF
            </span>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex gap-4">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded font-medium ${
                    selectedSize === size
                      ? "border-[#06B6D4] bg-[#E0F7FA]"
                      : "border-gray-300 hover:border-[#06B6D4]"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <h3 className="font-semibold">Quantity</h3>
            <div className="flex items-center gap-2 border rounded">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition"
              >
                -
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-3 bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white font-semibold rounded hover:opacity-90 transition">
              Add to Cart
            </button>
            <button className="flex-1 py-3 bg-green-500 text-white font-semibold rounded text-center hover:opacity-90 transition">
              Buy Now
            </button>
          </div>

          {/* Highlights */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Product Highlights</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {productData.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Product Description</h3>
            <p className="text-gray-700 leading-relaxed">{productData.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products / Carousel Placeholder */}
      <div className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">You may also like</h2>
        <div className="flex gap-4 overflow-x-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-semibold"
            >
              Product {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
