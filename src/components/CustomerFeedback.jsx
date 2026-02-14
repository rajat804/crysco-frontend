import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Rohit Sharma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Amazing quality products! Delivery was fast and packaging was premium. Highly recommended.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "I love the product results. Genuine and effective. Customer support was very helpful.",
  },
  {
    id: 3,
    name: "Aman Verma",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    review:
      "Best wellness brand I’ve tried so far. Totally worth the price.",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Fast delivery and genuine products. Loved the experience!",
  },
  {
    id: 5,
    name: "Rahul Singh",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    review:
      "Very effective supplements. Will definitely reorder.",
  },
  {
    id: 6,
    name: "Anjali Verma",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    review:
      "Excellent service and premium packaging. Highly satisfied.",
  },
];

const CustomerFeedback = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-gray-600 text-base md:text-lg">
            Trusted by thousands of happy customers
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 1.6 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-2 h-full">

                {/* Profile */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                      {item.name}
                    </h4>

                    <div className="flex text-emerald-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  "{item.review}"
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default CustomerFeedback;
