import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import v1 from "../assets/video1.mp4";
import v2 from "../assets/video2.mp4";
import v3 from "../assets/video3.mp4";
import v4 from "../assets/video4.mp4";

const PromoSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-16 py-12 overflow-hidden">
      
      <div className="grid md:grid-cols-2 gap-12 items-center w-full">
        
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Premium Crysco Products
          </h1>

          <p className="text-lg md:text-xl text-gray-300">
            Elevate your lifestyle with our trusted, high-quality health
            solutions crafted for modern living.
          </p>

          <div className="flex gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105">
              Shop Now
            </button>

            <button className="border border-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - VIDEO SWIPER */}
        <div className="relative">
          
          {/* Custom Buttons */}
          <div className="absolute top-1/2 -left-5 z-20 transform -translate-y-1/2">
            <button className="swiper-button-prev-custom bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-emerald-600 transition duration-300">
              <FaArrowLeft />
            </button>
          </div>

          <div className="absolute top-1/2 -right-5 z-20 transform -translate-y-1/2">
            <button className="swiper-button-next-custom bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-emerald-600 transition duration-300">
              <FaArrowRight />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{ clickable: true }}
            loop
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            {[v1, v2, v3, v4].map((video, index) => (
              <SwiperSlide key={index}>
                <video
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-[350px] md:h-[450px] object-cover"
                >
                  <source src={video} type="video/mp4" />
                </video>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
