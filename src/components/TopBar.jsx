import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  // "🚚 Free Shipping on Orders Above ₹999",
  // "🔥 Flat 20% Off on Wellness Products",
  // "💊 Trusted by 10,000+ Happy Customers",
  "🚚 Instant delivery on Order Above ₹2000 in Delhi/NCR",
  "🔥 Flat 10% Off on First Order",
  " Trusted by 10,000+ Happy Customers",
  "🌿 Better Health Starts Here",
  "💊 Premium Quality Wellness Products",
  "💚 Trusted by Thousands of Happy Customers",
];

const TopBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm py-2 overflow-hidden">
      <div className="relative h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            {messages[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopBar;
