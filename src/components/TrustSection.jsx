import { ShieldCheck, Truck, Wallet, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Quality Tested",
    desc: "100% verified & lab tested products",
  },
  {
    icon: <Truck size={28} />,
    title: "Free Shipping",
    desc: "On all orders above ₹999",
  },
  {
    icon: <Wallet size={28} />,
    title: "Cash on Delivery",
    desc: "Pay when you receive",
  },
  {
    icon: <RefreshCcw size={28} />,
    title: "Easy Returns",
    desc: "7-day hassle free return policy",
  },
];

const TrustSection = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        {features.map((item, index) => (
          <div
            key={index}
            className="group bg-white/70 backdrop-blur-lg border border-emerald-100 
                       p-6 rounded-2xl transition duration-300 
                       hover:-translate-y-3 hover:shadow-2xl hover:shadow-emerald-200"
          >
            {/* Icon */}
            <div className="mx-auto w-14 h-14 flex items-center justify-center 
                            rounded-full bg-emerald-100 text-emerald-600 
                            transition duration-300 
                            group-hover:bg-emerald-600 
                            group-hover:text-white 
                            group-hover:scale-110">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="mt-4 font-semibold text-gray-800 
                           transition duration-300 
                           group-hover:text-emerald-600">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-2">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TrustSection;
