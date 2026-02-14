import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1584367369853-5c5a7bfa6a54",
    title: "Boost Your Immunity",
    subtitle: "Premium health supplements for daily wellness",
  },
  {
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
    title: "Mental Wellness Matters",
    subtitle: "Support focus & stress relief naturally",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f",
    title: "Heart Care Essentials",
    subtitle: "Keep your heart healthy & strong",
  },
];

const HeroBanner = () => {
  return (
    <div className="w-full">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-[65vh] md:h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg mb-6 max-w-xl">
                  {slide.subtitle}
                </p>
                <button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-full text-sm md:text-base transition">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
