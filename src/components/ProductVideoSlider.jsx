import { useRef } from "react";
import { videoData } from "../data/videoData";

const ProductVideoSlider = ({ category }) => {
  const sliderRef = useRef();

  const normalizedCategory = category
    ?.toLowerCase()
    .replace(/-/g, " ")
    .trim();

  const videos = videoData[normalizedCategory] || [];

  // ✅ अगर videos नहीं हैं तो कुछ भी show मत करो
  if (!videos || videos.length === 0) return null;

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-12 relative w-full">

      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Product Videos
      </h2>

      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white px-3 py-2 rounded z-10"
      >
        ◀
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {videos.map((video, index) => (
          <div
            key={index}
            className="min-w-[90%] sm:min-w-[48%] lg:min-w-[48%]"
          >
            <video
              src={video}
              controls
              className="w-full h-[220px] sm:h-[240px] lg:h-[260px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white px-3 py-2 rounded z-10"
      >
        ▶
      </button>

    </div>
  );
};

export default ProductVideoSlider;