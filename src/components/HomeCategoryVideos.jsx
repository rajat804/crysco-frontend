import { useState } from "react";
import { homeVideos } from "../data/homeVideos";

const HomeCategoryVideos = ({ category }) => {
  const videos = homeVideos[category];

  // ❌ agar video nahi hai toh kuch bhi show nahi hoga
  if (!videos || videos.length === 0) {
    return null;
  }

  const videosPerSlide = 2;
  const totalSlides = Math.ceil(videos.length / videosPerSlide);

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const start = current * videosPerSlide;
  const visibleVideos = videos.slice(start, start + videosPerSlide);

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="w-full py-10">
          {/* Heading */}
          <h2 className="text-2xl font-bold mb-6 capitalize">{category}</h2>

          <div className="relative">
            {/* Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleVideos.map((video, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow">
                  <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-[260px] object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Prev Button */}
            {totalSlides > 1 && (
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded"
              >
                ‹
              </button>
            )}

            {/* Next Button */}
            {totalSlides > 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded"
              >
                ›
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCategoryVideos;
