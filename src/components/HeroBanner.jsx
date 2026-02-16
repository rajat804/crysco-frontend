import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import inner1 from "../assets/kitchenTissueRollBanner.png";
import inner2 from "../assets/garbageBagsBanner.png";
import inner3 from "../assets/kitchenTowelBanner.png";

const slides = [
  {
    image: inner1,
    title: "Clean & Fresh Kitchens Every Day",
    subtitle:
      "Experience the joy of a spotless kitchen with our premium quality kitchen tissue rolls that make your daily cleaning effortless and hygienic.",
  },
  {
    image: inner2,
    title: "Eco-Friendly Garbage Bags for a Greener Home",
    subtitle:
      "Keep your home neat and tidy while caring for the environment with our durable and reliable garbage bags designed for every household need.",
  },
  {
    image: inner3,
    title: "Soft, Strong, and Absorbent Kitchen Towels",
    subtitle:
      "Make your everyday chores easier and more enjoyable with our high-quality kitchen towels that combine softness, strength, and superior absorbency.",
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
