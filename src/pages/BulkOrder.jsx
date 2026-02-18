import PromoCTA from "../components/PromoCTA";
import { motion } from "framer-motion";
import {
  PackageCheck,
  Truck,
  Building2,
  PhoneCall,
  Mail,
  Send,
} from "lucide-react";
import assets from "../assets/assets";
import ProductCard from "../components/ProductCard";

const BulkOrder = () => {
  
  // Bulk Products Array
  const bulkProducts = [
    {
      name: "Bulk Garbage Bags Pack (1000 pcs)",
      price: 4999,
      oldPrice: 5999,
      discount: 15,
      image1:
        "",
      image2:
        "",
    },
    {
      name: "Bulk Kitchen Towels Carton",
      price: 3999,
      oldPrice: 4599,
      discount: 12,
      image1:
        "",
      image2:
        "",
    },
    {
      name: "Bulk Tissue Rolls Pack",
      price: 3499,
      oldPrice: 3999,
      discount: 10,
      image1:
        "",
      image2:
        "",
    },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-teal-600 to-cyan-600 py-28 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Bulk Product Inquiry & Sample Request
          </h1>
          <p className="max-w-3xl mx-auto text-teal-100 text-lg">
            Request samples, discuss bulk pricing, custom specifications, or
            long-term supply — we're here to support your business needs.
          </p>
        </motion.div>
      </section>

      {/* ================= WHOLESALER & BULK VISUALS ================= */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Bulk Production & Supply
            </h2>
            <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
              Designed for distributors, wholesalers, hotels, institutions, and
              large-scale buyers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[460px] rounded-3xl overflow-hidden shadow-xl bg-black"
            >
              <video
                src={assets.sampleVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px]"
            >
              {[
                assets.sampleImg1,
                assets.sampleImg2,
                assets.sampleImg3,
                assets.sampleImg4,
                assets.sampleImg5,
                assets.sampleImg6,
              ].map((img, index) => (
                <div
                  key={index}
                  className="w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white"
                >
                  <img
                    src={img}
                    alt={`Bulk supply example ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* BULK PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Bulk Product Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bulkProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: PackageCheck,
                title: "Check Quality First",
                desc: "Order samples to feel material, thickness & absorbency before bulk.",
              },
              {
                icon: Building2,
                title: "Custom Solutions",
                desc: "Request custom sizes, thickness, packaging or private labelling.",
              },
              {
                icon: Truck,
                title: "Fast & Reliable",
                desc: "Quick sample dispatch + dedicated support for bulk orders.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition"
              >
                <item.icon size={36} className="mx-auto mb-4 text-teal-600" />
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <PromoCTA />
    </>
  );
};

export default BulkOrder;
