import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const categoryOptions = {
    "garbage bags": ["green", "yellow", "black", "red", "blue"],
    "kitchen towel": [],
    "kitchen tissue": [],
  };

  const sizesList = ["Small", "Medium", "Large", "XL", "Jumbo"];

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    categoryType: "",
    sizes: [],
    mrp: "",
    salePrice: "",
    amazonLink: "",
    description: "",
    highlights: [""],
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
      categoryType: "",
      sizes: [],
    });
  };

  const toggleSize = (size) => {
    const exists = formData.sizes.includes(size);
    const updatedSizes = exists
      ? formData.sizes.filter((s) => s !== size)
      : [...formData.sizes, size];

    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleHighlightChange = (index, value) => {
    const updated = [...formData.highlights];
    updated[index] = value;
    setFormData({ ...formData, highlights: updated });
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ""] });
  };

  const removeHighlight = (index) => {
    const updated = formData.highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: updated });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("categoryType", formData.categoryType);
      data.append("sizes", JSON.stringify(formData.sizes));
      data.append("mrp", formData.mrp);
      data.append("salePrice", formData.salePrice);
      data.append("amazonLink", formData.amazonLink);
      data.append("description", formData.description);
      data.append("highlights", JSON.stringify(formData.highlights));

      formData.images.forEach((image) => {
        data.append("images", image);
      });

      const response = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      // ✅ Reset Form After Success
      setFormData({
        title: "",
        category: "",
        categoryType: "",
        sizes: [],
        mrp: "",
        salePrice: "",
        amazonLink: "",
        description: "",
        highlights: [""],
        images: [],
      });

      alert("✅ Product Uploaded Successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const colorMap = {
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    black: "bg-black",
    red: "bg-red-500",
    blue: "bg-blue-500",
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-slate-900 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-8">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Title */}
          <div>
            <label className="text-gray-300">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-300">Category</label>
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full mt-2 p-3 bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="garbage bags">Garbage Bags</option>
              <option value="kitchen towel">Kitchen Towel</option>
              <option value="kitchen tissue">Kitchen Tissue</option>
            </select>
          </div>

          {/* Color Type (Only Garbage Bags) */}
          {categoryOptions[formData.category]?.length > 0 && (
            <div>
              <label className="text-gray-300">Color Type</label>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {categoryOptions[formData.category].map((type) => (
                  <div
                    key={type}
                    onClick={() =>
                      setFormData({ ...formData, categoryType: type })
                    }
                    className={`cursor-pointer p-3 rounded-xl border-2 transition-all
                      ${
                        formData.categoryType === type
                          ? "border-blue-500 scale-105"
                          : "border-transparent"
                      } bg-slate-800 hover:bg-slate-700`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full ${colorMap[type]}`}
                      ></div>
                      <span className="capitalize">{type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sizes (Only Garbage Bags) */}
          {formData.category === "garbage bags" && (
            <div>
              <label className="text-gray-300">Select Sizes</label>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {sizesList.map((size) => (
                  <div
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`cursor-pointer p-3 rounded-xl text-center border-2 transition-all
                      ${
                        formData.sizes.includes(size)
                          ? "border-blue-500 bg-blue-600 scale-105"
                          : "border-transparent bg-slate-800 hover:bg-slate-700"
                      }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300">MRP</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-300">Sale Price</label>
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Amazon Link */}
          <div>
            <label className="text-gray-300">Amazon Link</label>
            <input
              type="url"
              name="amazonLink"
              value={formData.amazonLink}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="text-gray-300">Product Highlights</label>
            {formData.highlights.map((item, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="w-full p-3 bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="bg-red-600 px-3 rounded-lg"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="mt-3 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Highlight
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300">Product Description</label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="You can use "
              className="w-full mt-2 p-3 bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Images */}
          <div>
            <label className="text-gray-300">Upload Images</label>
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
            className={`w-full p-3 rounded-lg font-semibold text-lg transition-all
    ${
      loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
          >
            {loading ? "Uploading Product..." : "Save Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Products;
