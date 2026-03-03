import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const Bulk = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    variants: [{ pack: "", price: "", salePrice: "" }],
    amazonLink: "",
    description: "",
    highlights: [""],
    images: [],
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // ------------------ Basic Change ------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ------------------ Variant Logic ------------------
  const handleVariantChange = (index, field, value) => {
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

  // ------------------ Highlights ------------------
  const handleHighlightChange = (index, value) => {
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

  // ------------------ Images ------------------
  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  // ------------------ Submit ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("variants", JSON.stringify(formData.variants));
      data.append("amazonLink", formData.amazonLink);
      data.append("description", formData.description);
      data.append("highlights", JSON.stringify(formData.highlights));

      formData.images.forEach((image) => {
        data.append("images", image);
      });

      const response = await fetch(`${BASE_URL}/api/products/bulk`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("✅ Bulk Product Uploaded Successfully");

      setFormData({
        title: "",
        category: "",
        variants: [{ pack: "", price: "", salePrice: "" }],
        amazonLink: "",
        description: "",
        highlights: [""],
        images: [],
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-slate-900 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-8">Add Bulk Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="font-semibold">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 bg-slate-800 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="garbage bags">Garbage Bags</option>
              <option value="kitchen towel">Kitchen Towel</option>
              <option value="kitchen tissue">Kitchen Tissue</option>
            </select>
          </div>

          {/* Pack & Pricing */}
          <div>
            <label className="font-semibold">
              Pack Size & Pricing (Example: Pack of 6 Rolls)
            </label>

            {formData.variants.map((variant, index) => (
              <div key={index} className="grid md:grid-cols-4 gap-3 mt-3">

                <input
                  type="text"
                  placeholder="Pack of 6 Rolls"
                  value={variant.pack}
                  onChange={(e) =>
                    handleVariantChange(index, "pack", e.target.value)
                  }
                  required
                  className="p-3 bg-slate-800 rounded-lg"
                />

                <input
                  type="number"
                  placeholder="MRP Price"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  required
                  className="p-3 bg-slate-800 rounded-lg"
                />

                <input
                  type="number"
                  placeholder="Sale Price"
                  value={variant.salePrice}
                  onChange={(e) =>
                    handleVariantChange(index, "salePrice", e.target.value)
                  }
                  required
                  className="p-3 bg-slate-800 rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="bg-red-600 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addVariant}
              className="mt-4 bg-blue-600 px-4 py-2 rounded-lg"
            >
              + Add More Pack
            </button>
          </div>

          {/* Highlights */}
          <div>
            <label className="font-semibold">Product Highlights</label>

            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-3 mt-3">
                <input
                  type="text"
                  placeholder="Enter highlight"
                  value={highlight}
                  onChange={(e) =>
                    handleHighlightChange(index, e.target.value)
                  }
                  className="w-full p-3 bg-slate-800 rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="bg-red-600 px-3 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addHighlight}
              className="mt-4 bg-green-600 px-4 py-2 rounded-lg"
            >
              + Add Highlight
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Images */}
          <div>
            <label className="font-semibold">Upload Images</label>
            <input
              type="file"
              multiple
              required
              onChange={handleImageChange}
              className="w-full mt-2 p-3 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold ${
              loading
                ? "bg-gray-500"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Save Bulk Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Bulk;