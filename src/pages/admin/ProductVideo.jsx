import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const ProductVideo = () => {
  const [category, setCategory] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const categoryOptions = {
    "garbage bags": ["green", "yellow", "black", "red", "blue"],
    "kitchen towel": [],
    "kitchen tissue": [],
  };

  const handleUpload = async (e) => {
  e.preventDefault();

  if (!video) return alert("Please select video");
  if (!category) return alert("Please select category");

  if (category === "garbage bags" && !categoryType) {
    return alert("Please select category type");
  }

  if (video.size > 50 * 1024 * 1024) {
    return alert("Video size must be less than 50MB");
  }

  const formData = new FormData();
  formData.append("video", video);
  formData.append("category", category);
  formData.append("categoryType", categoryType);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    setLoading(true);

    const res = await fetch(`${BASE_URL}/api/videos/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    alert("Video Uploaded Successfully ✅");

    // Reset Form
    setVideo(null);
    setCategory("");
    setCategoryType("");

  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-6">Upload Product Video</h2>

        <form onSubmit={handleUpload} className="space-y-5">
          {/* Category */}
          <div>
            <label className="text-gray-300">Category</label>
            <select
              className="w-full mt-2 p-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCategoryType("");
              }}
              required
            >
              <option value="">Select Category</option>
              <option value="garbage bags">Garbage Bags</option>
              <option value="kitchen towel">Kitchen Towel</option>
              <option value="kitchen tissue">Kitchen Tissue</option>
            </select>
          </div>

          {/* Category Type */}
          {categoryOptions[category]?.length > 0 && (
            <div>
              <label className="text-gray-300">Category Type</label>
              <select
                className="w-full mt-2 p-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                {categoryOptions[category].map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Video Upload */}
          <div>
            <label className="text-gray-300">Upload Video (Max 50MB)</label>
            <input
              type="file"
              accept="video/*"
              className="w-full mt-2 text-white"
              onChange={(e) => setVideo(e.target.files[0])}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductVideo;
