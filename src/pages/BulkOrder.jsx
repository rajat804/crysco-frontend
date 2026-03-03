import { useEffect, useState } from "react";
import BulkProductCard from "../components/BulkProductCard";

const BulkOrder = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBulkProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/bulk`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBulkProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Bulk Product Collection
      </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center">No Bulk Products Found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <BulkProductCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BulkOrder;