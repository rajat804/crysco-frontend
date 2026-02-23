import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [newImagesPreview, setNewImagesPreview] = useState([]);

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
    amazingDeals: false,
    newArrivals: false,
  });

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${BASE_URL}/api/products/${id}`);
      const data = await res.json();

      setFormData({
        title: data.title,
        category: data.category,
        categoryType: data.categoryType,
        sizes: data.sizes,
        mrp: data.mrp,
        salePrice: data.salePrice,
        amazonLink: data.amazonLink,
        description: data.description,
        highlights: data.highlights,
        images: [],
        amazingDeals: data.amazingDeals || false,
        newArrivals: data.newArrivals || false,
      });

      setExistingImages(data.images || []);
    };

    fetchProduct();
  }, [id]);

  // ================= HANDLERS =================

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    const updated = exists
      ? formData.sizes.filter((s) => s !== size)
      : [...formData.sizes, size];

    setFormData({ ...formData, sizes: updated });
  };

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
    setFormData({
      ...formData,
      highlights: updated.length ? updated : [""],
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  // ================= IMAGE HANDLING =================

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setNewImagesPreview(previews);
  };

  const removeExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
  };

  const removeNewImage = (index) => {
    const updatedPreview = newImagesPreview.filter((_, i) => i !== index);
    const updatedFiles = formData.images.filter((_, i) => i !== index);

    setNewImagesPreview(updatedPreview);
    setFormData({ ...formData, images: updatedFiles });
  };

  // ================= UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("categoryType", formData.categoryType);
    data.append("sizes", JSON.stringify(formData.sizes));
    data.append("highlights", JSON.stringify(formData.highlights));
    data.append("mrp", formData.mrp);
    data.append("salePrice", formData.salePrice);
    data.append("amazonLink", formData.amazonLink);
    data.append("description", formData.description);
    data.append("existingImages", JSON.stringify(existingImages));
    data.append("amazingDeals", formData.amazingDeals);
    data.append("newArrivals", formData.newArrivals);

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    const res = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "PUT",
      body: data,
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) return alert(result.message);

    alert("✅ Product Updated Successfully");
    navigate("/admin/products-show");
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
      <div className="max-w-6xl mx-auto bg-slate-900 p-8 rounded-2xl text-white">
        <h2 className="text-3xl font-bold mb-8">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-lg"
          />

          {/* Category */}
          <select
            value={formData.category}
            onChange={handleCategoryChange}
            className="w-full p-3 bg-slate-800 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="garbage bags">Garbage Bags</option>
            <option value="kitchen towel">Kitchen Towel</option>
            <option value="kitchen tissue">Kitchen Tissue</option>
          </select>

          {/* Category Type */}
          {categoryOptions[formData.category]?.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {categoryOptions[formData.category].map((type) => (
                <div
                  key={type}
                  onClick={() =>
                    setFormData({ ...formData, categoryType: type })
                  }
                  className={`cursor-pointer p-3 rounded-xl border-2
                    ${formData.categoryType === type ? "border-blue-500 scale-105" : "border-transparent"}
                    bg-slate-800`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full ${colorMap[type]}`}
                    ></div>
                    <span>{type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sizes */}
          {formData.category === "garbage bags" && (
            <div className="grid grid-cols-3 gap-3">
              {sizesList.map((size) => (
                <div
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`cursor-pointer p-3 text-center rounded-xl border-2
                    ${formData.sizes.includes(size) ? "border-blue-500 bg-blue-600" : "bg-slate-800"}`}
                >
                  {size}
                </div>
              ))}
            </div>
          )}

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              placeholder="MRP"
              className="p-3 bg-slate-800 rounded-lg"
            />
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              placeholder="Sale Price"
              className="p-3 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Amazon Link */}
          <input
            type="url"
            name="amazonLink"
            value={formData.amazonLink}
            onChange={handleChange}
            placeholder="Amazon Link"
            className="w-full p-3 bg-slate-800 rounded-lg"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 bg-slate-800 rounded-lg"
          />

          {/* Highlights */}
          {formData.highlights.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="w-full p-3 bg-slate-800 rounded-lg"
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
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            + Add Highlight
          </button>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="amazingDeals"
                checked={formData.amazingDeals}
                onChange={handleCheckboxChange}
                className="w-5 h-5"
              />
              Amazing Deals
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="newArrivals"
                checked={formData.newArrivals}
                onChange={handleCheckboxChange}
                className="w-5 h-5"
              />
              New Arrivals
            </label>
          </div>

          {/* Existing Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  className="h-32 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-600 px-2 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Upload New */}
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 bg-slate-800 rounded-lg"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newImagesPreview.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  className="h-32 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-red-600 px-2 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className="w-full p-3 bg-blue-600 rounded-lg">
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
