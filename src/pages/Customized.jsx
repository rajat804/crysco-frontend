import React, { useState } from "react";
import assets from "../assets/assets";

const Customized= () => {
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedColor, setSelectedColor] = useState("White");
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [logo, setLogo] = useState(null);

  const handleBuyNow = () => {
    const orderData = {
      size: selectedSize,
      color: selectedColor,
      quantity,
      customText,
      instructions,
      logo,
    };

    console.log("Order Details:", orderData);
    alert("Order Submitted! Check console for details.");
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

        {/* Left Side - Product Image */}
        <div>
          <img
            src={assets.garbageImg}
            alt="Customized Product"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Side - Customization Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            Customize Your Product
          </h2>

          {/* Size Selection */}
          <div className="mb-4">
            <label className="font-medium">Select Size</label>
            <select
              className="w-full mt-2 p-2 border rounded-lg"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>XL</option>
            </select>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="font-medium">Select Color</label>
            <select
              className="w-full mt-2 p-2 border rounded-lg"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option>White</option>
              <option>Black</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              className="w-full mt-2 p-2 border rounded-lg"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Custom Text */}
          <div className="mb-4">
            <label className="font-medium">Custom Print Text</label>
            <input
              type="text"
              placeholder="Enter text to print..."
              className="w-full mt-2 p-2 border rounded-lg"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
          </div>

          {/* Logo Upload */}
          <div className="mb-4">
            <label className="font-medium">Upload Logo</label>
            <input
              type="file"
              className="w-full mt-2"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>

          {/* Special Instructions */}
          <div className="mb-6">
            <label className="font-medium">Special Instructions</label>
            <textarea
              rows="3"
              placeholder="Any special request?"
              className="w-full mt-2 p-2 border rounded-lg"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Buy Now
          </button>

        </div>
      </div>
    </section>
  );
};

export default Customized;
