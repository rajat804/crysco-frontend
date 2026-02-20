import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();

      console.log("API Response:", data);

      // 🔥 Handle both response types
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
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
      await fetch(`${BASE_URL}/api/products/${id}`, {
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
        <h2 className="text-2xl font-bold text-white">All Products</h2>

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
            {/* Scroll Container */}
            <div className="w-full max-h-[75vh] overflow-x-auto overflow-y-auto">
              <table className="min-w-[1500px] text-sm text-left text-gray-300">
                <thead className="sticky top-0 z-20 bg-slate-800 text-gray-200 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Images</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Color</th>
                    <th className="px-4 py-3">Sizes</th>
                    <th className="px-4 py-3">MRP</th>
                    <th className="px-4 py-3">Sale</th>
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
                                src={img.url}
                                alt="product"
                                className="w-12 h-12 object-cover rounded-md border border-slate-600"
                              />
                            ))
                          ) : (
                            <span className="text-gray-500 text-xs">
                              No Image
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 max-w-[200px] break-words">
                        {item.title}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.category}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.categoryType || "-"}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.sizes?.join(", ") || "-"}
                      </td>

                      <td className="px-4 py-3 line-through text-red-400 whitespace-nowrap">
                        ₹{item.mrp}
                      </td>

                      <td className="px-4 py-3 text-emerald-400 whitespace-nowrap">
                        ₹{item.salePrice}
                      </td>

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

                      <td className="px-4 py-3 max-w-[220px] break-words">
                        {item.highlights?.join(", ") || "-"}
                      </td>

                      <td className="px-4 py-3 max-w-[260px] break-words">
                        {item.description}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/edit-product/${item._id}`}
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

export default ShowProducts;