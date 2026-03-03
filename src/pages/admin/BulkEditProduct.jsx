import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BulkEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    amazonLink: "",
    highlights: [],
    variants: [],
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/bulk/${id}`);
        const data = await res.json();

        setFormData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          amazonLink: data.amazonLink || "",
          highlights: data.highlights || [],
          variants: data.variants || [],
        });

        setExistingImages(data.images || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ================= BASIC INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= HIGHLIGHTS =================
  const handleHighlightChange = (value, index) => {
    const updated = [...formData.highlights];
    updated[index] = value;
    setFormData({ ...formData, highlights: updated });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, ""],
    });
  };

  const removeHighlight = (index) => {
    const updated = formData.highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: updated });
  };

  // ================= VARIANTS =================
  const handleVariantChange = (value, index, field) => {
    const updated = [...formData.variants];
    updated[index][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { pack: "", price: "", salePrice: "" }],
    });
  };

  const removeVariant = (index) => {
    const updated = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updated });
  };

  // ================= IMAGES =================
  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const removeExistingImage = (index) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = new FormData();

    form.append("title", formData.title);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("amazonLink", formData.amazonLink);
    form.append("highlights", JSON.stringify(formData.highlights));
    form.append("variants", JSON.stringify(formData.variants));
    form.append("existingImages", JSON.stringify(existingImages));

    newImages.forEach((img) => {
      form.append("images", img);
    });

    try {
      const res = await fetch(`${BASE_URL}/api/products/bulk/${id}`, {
        method: "PUT",
        body: form,
      });

      if (res.ok) {
        alert("Product Updated Successfully 🎉");
        navigate("/admin/bulk-products-show");
      } else {
        alert("Update Failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Edit Bulk Product</h2>

        <Link
          to="/admin/dashboard"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          ← Go to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC DETAILS */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 bg-gray-800 rounded"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 bg-gray-800 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 bg-gray-800 rounded"
        />

        <input
          type="text"
          name="amazonLink"
          value={formData.amazonLink}
          onChange={handleChange}
          placeholder="Amazon Link"
          className="w-full p-3 bg-gray-800 rounded"
        />

        {/* HIGHLIGHTS */}
        <div>
          <h3 className="font-semibold mb-2">Highlights</h3>
          {formData.highlights.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleHighlightChange(e.target.value, index)}
                className="flex-1 p-2 bg-gray-800 rounded"
              />
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="bg-red-600 px-3 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="bg-blue-600 px-4 py-1 rounded"
          >
            + Add Highlight
          </button>
        </div>

        {/* VARIANTS */}
        <div>
          <h3 className="font-semibold mb-2">Variants</h3>

          {formData.variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2">
              <input
                type="text"
                placeholder="Pack"
                value={variant.pack}
                onChange={(e) =>
                  handleVariantChange(e.target.value, index, "pack")
                }
                className="p-2 bg-gray-800 rounded"
              />

              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(e.target.value, index, "price")
                }
                className="p-2 bg-gray-800 rounded"
              />

              <input
                type="number"
                placeholder="Sale Price"
                value={variant.salePrice}
                onChange={(e) =>
                  handleVariantChange(e.target.value, index, "salePrice")
                }
                className="p-2 bg-gray-800 rounded"
              />

              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="bg-red-600 rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="bg-green-600 px-4 py-1 rounded"
          >
            + Add Variant
          </button>
        </div>

        {/* EXISTING IMAGES */}
        <div className="flex gap-3 flex-wrap">
          {existingImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt=""
                className="w-28 h-28 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(index)}
                className="absolute top-0 right-0 bg-red-600 text-xs px-2 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full bg-gray-800 p-2 rounded"
        />

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-green-600 py-3 rounded font-bold"
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default BulkEditProduct;
