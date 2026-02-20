import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const ShowVideos = () => {
  const [videos, setVideos] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/videos`);
      const data = await res.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${BASE_URL}/api/videos/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } else {
      alert("Delete failed");
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 text-white">All Videos</h2>

      <div className="overflow-auto max-h-[80vh] bg-slate-800 rounded-xl shadow-lg">
        <table className="min-w-[900px] w-full text-sm text-left text-gray-300">
          <thead className="bg-slate-700 text-gray-200 uppercase text-xs sticky top-0">
            <tr>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Category Type</th>
              <th className="px-6 py-3">Preview</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {videos.map((item) => (
              <tr
                key={item._id}
                className="border-b border-slate-700 hover:bg-slate-700 transition"
              >
                <td className="px-6 py-4">{item.category}</td>

                <td className="px-6 py-4">
                  {item.categoryType || "-"}
                </td>

                <td className="px-6 py-4">
                  <video
                    src={item.videoUrl}
                    controls
                    className="w-40 h-24 rounded"
                  />
                </td>

                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ShowVideos;