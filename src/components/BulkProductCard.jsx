import { useNavigate } from "react-router-dom";

const BulkProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Safe lowest variant calculation
  const lowestVariant =
    product?.variants && product.variants.length > 0
      ? product.variants.reduce((min, curr) =>
          curr.salePrice < min.salePrice ? curr : min
        )
      : null;

  // Discount % calculation
  const discountPercent =
    lowestVariant && lowestVariant.price > 0
      ? Math.round(
          ((lowestVariant.price - lowestVariant.salePrice) /
            lowestVariant.price) *
            100
        )
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border relative">
      
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {discountPercent}% OFF
        </div>
      )}

      {/* Image */}
      <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product?.images?.[0]}
          alt={product?.title}
          className="h-48 object-contain transition duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product?.title}
        </h3>

        {/* Price */}
        {lowestVariant && (
          <div className="mb-3">
            <span className="text-xl font-bold text-emerald-600">
              ₹{lowestVariant.salePrice}
            </span>
            <span className="text-gray-400 line-through ml-2">
              ₹{lowestVariant.price}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              (Starting Price)
            </span>
          </div>
        )}

        {/* Variant Count */}
        <p className="text-sm text-gray-500 mb-4">
          {product?.variants?.length || 0} Pack Options Available
        </p>

        {/* Button */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/bulk-product/${product._id}`)}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkProductCard;