import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <>
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

        <div className="w-full bg-slate-800 rounded-xl shadow-lg">
          {/* Scroll Container */}
          <div className="overflow-x-auto max-h-[75vh]">
            <table className="min-w-[900px] w-full text-sm text-left text-gray-300 table-auto">
              <thead className="sticky top-0 z-20 bg-slate-700 text-gray-200 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Category</th>
                  <th className="px-4 py-3 whitespace-nowrap">Category Type</th>
                  <th className="px-4 py-3 whitespace-nowrap">Preview</th>
                  <th className="px-4 py-3 whitespace-nowrap">Created</th>
                  <th className="px-4 py-3 whitespace-nowrap">Action</th>
                </tr>
              </thead>

              <tbody>
                {videos.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-700 hover:bg-slate-700 transition"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {item.categoryType || "-"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <video
                        src={item.videoUrl}
                        controls
                        className="w-36 h-20 sm:w-40 sm:h-24 rounded"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowVideos;
