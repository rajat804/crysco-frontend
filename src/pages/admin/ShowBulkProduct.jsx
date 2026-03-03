import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowBulkProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // ✅ Fetch Products
  const fetchProducts = async () => {
  try {
    console.log("Fetching bulk products...");
    const res = await fetch(`${BASE_URL}/api/products/bulk`);
    const data = await res.json();
    
    console.log("API Response:", data); // Log the full response from the API

    // 🔍 Check structure of API response
    if (Array.isArray(data)) {
      setProducts(data); // If it's an array, use the data as products
    } else if (data?.products && Array.isArray(data.products)) {
      setProducts(data.products); // If the response contains "products" array, set products
    } else {
      console.warn("Unexpected API structure", data); // Log if the structure is unexpected
      setProducts([]); // Return empty array if unexpected
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    setProducts([]); // Set empty if there's an error fetching data
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await fetch(`${BASE_URL}/api/products/bulk/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">All Bulk Products</h2>

        <Link
          to="/admin/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">No Products Found</p>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1400px] bg-slate-900 rounded-xl shadow-xl">
            <div className="w-full max-h-[75vh] overflow-x-auto overflow-y-auto">
              <table className="min-w-[1300px] text-sm text-left text-gray-300">
                <thead className="sticky top-0 z-20 bg-slate-800 text-gray-200 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Images</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Variants</th>
                    <th className="px-4 py-3">Amazon</th>
                    <th className="px-4 py-3">Highlights</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-slate-700 hover:bg-slate-800 transition"
                    >
                      {/* Images */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 w-[180px]">
                          {item.images?.length > 0 ? (
                            item.images.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="product"
                                className="w-12 h-12 object-cover rounded-md border border-slate-600"
                              />
                            ))
                          ) : (
                            <span className="text-gray-500 text-xs">No Image</span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 max-w-[200px] break-words">
                        {item.title}
                      </td>

                      <td className="px-4 py-3">{item.category}</td>

                      {/* Variants */}
                      <td className="px-4 py-3 max-w-[220px] break-words">
                        {item.variants?.map((variant, index) => (
                          <div key={index} className="mb-1">
                            <div className="text-xs">
                              <strong>{variant.pack}</strong><br />
                              MRP: ₹{variant.price} / Sale: ₹{variant.salePrice}
                            </div>
                          </div>
                        ))}
                      </td>

                      {/* Amazon Link */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.amazonLink ? (
                          <a
                            href={item.amazonLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 underline"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Highlights */}
                      <td className="px-4 py-3 max-w-[200px] break-words">
                        {item.highlights?.join(", ") || "-"}
                      </td>

                      {/* Description */}
                      <td className="px-4 py-3 max-w-[260px] break-words">
                        {item.description}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/bulk-edit-product/${item._id}`}
                            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBulkProduct;