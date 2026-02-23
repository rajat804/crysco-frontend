import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  // ✅ Calculate discount automatically
   const navigate = useNavigate();
  const discount =
    product.mrp && product.salePrice
      ? Math.round(((product.mrp - product.salePrice) / product.mrp) * 100)
      : 0;

  const image = product.images && product.images.length > 0 ? product.images[0] : "";

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100">
      {discount > 0 && (
        <span className="absolute top-4 left-4 z-10 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow">
          Extra {discount}% OFF
        </span>
      )}

      {/* Image */}
      <div className="relative h-72 bg-emerald-50 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={product.title}
          className="absolute h-60 object-contain transition-all duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-gray-800 font-semibold text-sm md:text-base uppercase tracking-wide group-hover:text-emerald-600 transition">
          {product.title}
        </h3>

        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="text-xl font-bold text-gray-900">₹{product.salePrice}</span>
          {product.mrp && (
            <span className="line-through text-gray-400 text-sm">₹{product.mrp}</span>
          )}
          {discount > 0 && (
            <span className="text-emerald-600 text-sm font-semibold">{discount}% OFF</span>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            BUY NOW
          </button>

          <button
            className="w-14 flex items-center justify-center border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg group relative"
            onClick={() => navigate(`/product/${product._id}`)} // Navigate to details page
          >
            <FaEye className="text-lg transition-transform duration-300 group-hover:scale-125" />
            <span className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300">
              View
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;