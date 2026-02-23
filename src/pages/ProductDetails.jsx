import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch product
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setMainImage(data.images[0] || "");
        if (data.sizes && data.sizes.length) setSelectedSize(data.sizes[0]);
        if (data.colors && data.colors.length) setSelectedColor(data.colors[0]);
        else if (data.categoryType) setSelectedColor(data.categoryType);
      } catch (err) {
        console.log("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!product) return <p className="text-center py-20">Loading...</p>;

  const discount =
    product.mrp && product.salePrice
      ? Math.round(((product.mrp - product.salePrice) / product.mrp) * 100)
      : 0;

  const handleOpenCartModal = () => {
    if (!isLoggedIn) {
      alert("Please login to add products to cart");
      return;
    }
    setCartModalOpen(true);
  };

  const handleCloseCartModal = () => setCartModalOpen(false);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const cartItem = {
        productId: product._id,
        title: product.title,
        price: product.salePrice,
        quantity,
        size: product.sizes ? selectedSize : null,
        color: product.colors ? selectedColor : product.categoryType || null,
        image: product.images[0],
      };

      const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Added to cart successfully!");
        console.log(data);
        setCartModalOpen(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Error adding to cart");
    }
  };

  // const handleBuyNow = () => {
  //   alert("Proceeding to buy now!");
  // };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Images */}
        <div className="flex-1">
          <div className="w-full h-96 md:h-[500px] rounded overflow-hidden shadow-lg">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4 mt-4 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  mainImage === img ? "border-[#06B6D4]" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Details */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-gray-800">
              ₹{product.salePrice}
            </span>
            {product.mrp && (
              <span className="line-through text-gray-400">₹{product.mrp}</span>
            )}
            {discount > 0 && (
              <span className="text-green-600 font-semibold">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Select Size:</h3>
              <div className="flex gap-4 flex-wrap">
                {product.sizes.map((size) => (
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
          )}

          {/* Color Selection */}
          {(product.colors || product.categoryType) && (
            <div>
              <h3 className="font-semibold mb-2">Select Color:</h3>
              <div className="flex gap-4 flex-wrap">
                {(product.colors || [product.categoryType]).map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-2 border rounded font-medium ${
                      selectedColor === color
                        ? "border-[#06B6D4] bg-[#E0F7FA]"
                        : "border-gray-300 hover:border-[#06B6D4]"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-2">
            <h3 className="font-semibold">Quantity:</h3>
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
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleOpenCartModal}
              className="flex-1 py-3 bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white font-semibold rounded hover:opacity-90 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => alert("Buy Now!")}
              className="flex-1 py-3 bg-green-500 text-white font-semibold rounded hover:opacity-90 transition"
            >
              Buy Now
            </button>
            {product.amazonLink && (
              <a
                href={product.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-orange-500 text-white font-semibold rounded text-center hover:opacity-90 transition"
              >
                Buy on Amazon
              </a>
            )}
          </div>

          {/* Cart Modal */}
          {isCartModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 relative">
                <button
                  onClick={handleCloseCartModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                <h2 className="text-xl font-bold mb-4">{product.title}</h2>

                {/* Size */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Select Size:</h3>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
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
                )}

                {/* Color */}
                {(product.colors || product.categoryType) && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Select Color:</h3>
                    <div className="flex gap-2 flex-wrap">
                      {(product.colors || [product.categoryType]).map(
                        (color) => (
                          <button
                            key={color}
                            className={`px-4 py-2 border rounded font-medium ${
                              selectedColor === color
                                ? "border-[#06B6D4] bg-[#E0F7FA]"
                                : "border-gray-300 hover:border-[#06B6D4]"
                            }`}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-4 flex items-center gap-2">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 text-gray-700 border rounded hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 text-gray-700 border rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Confirm */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 bg-[#06B6D4] text-white font-semibold rounded hover:opacity-90 transition"
                >
                  Confirm Add to Cart
                </button>
              </div>
            </div>
          )}

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Highlights</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
