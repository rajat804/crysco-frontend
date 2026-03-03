import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BulkProductCard from "../components/BulkProductCard";
import { useAuth } from "../context/AuthContext";

const BulkProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { token } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/bulk/${id}`);
        const data = await res.json();

        setProduct(data);

        if (data?.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }

        if (data?.images?.length > 0) {
          setMainImage(data.images[0]);
        }

        if (data?.category) {
          const relatedRes = await fetch(
            `${BASE_URL}/api/products/bulk?category=${data.category}`
          );
          const relatedData = await relatedRes.json();
          const filtered = relatedData.filter((item) => item._id !== data._id);
          setRelatedProducts(filtered.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ================= BUY NOW =================
  const handleBuyNow = () => {
    if (!token) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }
    setShowCheckout(true);
  };

  // ================= PAYMENT =================
  const handleRazorpayPayment = async () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      alert("Please fill all details");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: selectedVariant.salePrice,
        }),
      });

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Your Company Name",
        description: product.title,
        order_id: order.id,
        handler: function () {
          alert("Payment Successful 🎉");
          setShowCheckout(false);
          navigate("/order-success");
        },
        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },
        theme: { color: "#059669" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const discount =
    selectedVariant?.price > 0
      ? Math.round(
          ((selectedVariant.price - selectedVariant.salePrice) /
            selectedVariant.price) *
            100
        )
      : 0;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* PRODUCT SECTION */}
        <div className="grid md:grid-cols-2 gap-14 mb-20">

          {/* LEFT - IMAGES */}
          <div>
            <div className="bg-gray-100 rounded-2xl p-8 flex justify-center">
              <img
                src={mainImage}
                alt={product.title}
                className="h-96 object-contain"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className="h-20 w-20 object-cover border rounded cursor-pointer hover:border-emerald-600"
                />
              ))}
            </div>
          </div>

          {/* RIGHT - DETAILS */}
          <div>
            <h1 className="text-4xl font-bold mb-3">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Variant Selection */}
            <h3 className="font-semibold mb-3">Select Pack:</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {product.variants?.map((variant) => (
                <button
                  key={variant._id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-5 py-2 border rounded-lg transition ${
                    selectedVariant?._id === variant._id
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white hover:border-emerald-500"
                  }`}
                >
                  {variant.pack}
                </button>
              ))}
            </div>

            {/* PRICE SECTION */}
            {selectedVariant && (
              <div className="mb-6">
                {discount > 0 && (
                  <span className="bg-red-600 text-white px-3 py-1 text-sm rounded-full">
                    {discount}% OFF
                  </span>
                )}

                <div className="mt-3 flex items-center gap-4">
                  <span className="text-4xl font-bold text-emerald-600">
                    ₹{selectedVariant.salePrice}
                  </span>
                  <span className="text-gray-400 line-through text-xl">
                    ₹{selectedVariant.price}
                  </span>
                </div>

                <p className="text-green-600 mt-2 font-medium">
                  You Save ₹
                  {selectedVariant.price - selectedVariant.salePrice}
                </p>

              </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition font-semibold"
              >
                Buy Now
              </button>

              {product.amazonLink && (
                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-yellow-500 text-black py-3 rounded-xl text-center hover:bg-yellow-600 transition font-semibold"
                >
                  Buy on Amazon
                </a>
              )}
            </div>

            {/* HIGHLIGHTS */}
            {product.highlights?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold mb-3">Highlights:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {product.highlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SPECIFICATIONS */}
            {product.specifications && (
              <div>
                <h3 className="font-semibold mb-3">Specifications:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="border p-3 rounded">
                        <p className="font-medium">{key}</p>
                        <p className="text-gray-600">{value}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-10 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((item) => (
                <BulkProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-5">Shipping Details</h2>

            <div className="space-y-4">
              {["fullName", "phone", "address", "city", "pincode"].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    className="w-full border p-3 rounded-lg"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field]: e.target.value,
                      })
                    }
                  />
                )
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 border py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleRazorpayPayment}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-lg"
              >
                Pay ₹{selectedVariant?.salePrice}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkProductDetails;