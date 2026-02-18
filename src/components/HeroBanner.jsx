import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[45vh] md:h-[65vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Image - Complete Show */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="max-h-full max-w-full object-contain"
          />

          {/* Light Overlay (Optional - Remove if not needed) */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-4xl font-bold mb-3 max-w-4xl"
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-base mb-5 max-w-2xl"
            >
              {slides[current].subtitle}
            </motion.p>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-full transition"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroBanner;
