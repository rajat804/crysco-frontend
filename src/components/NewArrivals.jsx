import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        // ✅ Filter only newArrivals products
        const newArrivals = data.filter((p) => p.newArrivals);
        setProducts(newArrivals);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            New Arrivals
          </h2>

          <button
            onClick={() => navigate("/new-arrivals")}
            className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition duration-300 shadow hover:shadow-lg"
          >
            View All Products
          </button>
        </div>

        {/* Product Grid (first 8 only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;