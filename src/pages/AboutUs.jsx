import React from "react";
import { motion } from "framer-motion";
import {
  Package as PackageIcon,
  Factory,
  ShieldCheck,
  Award,
  Truck,
  Leaf,
} from "lucide-react";
import assets from "../assets/assets";

// Fade-up animation for motion
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <>
      {/* ================= VISION ================= */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            To become a leading and trusted brand in plastic packaging and
            hygiene products by delivering value-driven solutions, innovation,
            and consistent quality — every single day.
          </p>
        </motion.div>
      </section>

      <section className="bg-white">
        {/* ================= IMAGE EXPERIENCE ================= */}
        <div className="w-full">
          {/* HERO HORIZONTAL IMAGE */}
          <div className="relative w-full overflow-hidden">
            <img
              src={assets.image2}
              alt="Production Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-10 left-10 text-white max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Inside Our Production
              </h2>
              <p className="mt-3 text-slate-200">
                Precision, scale, and quality built into every process.
              </p>
            </div>
          </div>

          {/* SPLIT IMAGE STORY */}
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
              {/* LEFT – VERTICAL IMAGE */}
              <div className="lg:col-span-1 h-[70vh] overflow-hidden rounded-3xl">
                <img
                  src={assets.image1}
                  alt="Production"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CENTER – TEXT BLOCK */}
              <div className="flex flex-col justify-center px-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Manufacturing at Scale
                </h3>
                <p className="mt-6 text-slate-600 leading-relaxed">
                  Our facilities are designed to handle large-scale production
                  while maintaining strict quality standards. Every stage is
                  optimized for efficiency, hygiene, and consistency.
                </p>
              </div>

              {/* RIGHT – STACKED IMAGES */}
              <div className="flex flex-col gap-6">
                <div className="h-[32vh] rounded-3xl overflow-hidden">
                  <img
                    src={assets.image3}
                    alt="Production"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-[32vh] rounded-3xl overflow-hidden">
                  <img
                    src={assets.image4}
                    alt="Production"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= VIDEO EXPERIENCE ================= */}
        <div className="w-full bg-slate-900 text-white">
          {/* VIDEO STRIP 1 */}
          <div className="relative w-full h-[70vh] overflow-hidden">
            <video
              src={assets.video1}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-10 left-10 max-w-xl">
              <h3 className="text-3xl font-bold">Automated Processes</h3>
              <p className="mt-3 text-slate-300">
                High-speed, precision-driven production lines.
              </p>
            </div>
          </div>

          {/* VIDEO GRID STRIP */}
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[assets.video2, assets.video3, assets.video4].map(
                (video, index) => (
                  <div
                    key={index}
                    className="h-[45vh] rounded-3xl overflow-hidden bg-black"
                  >
                    <video
                      src={video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      {/* ================= NEW CERTIFICATES SECTION ================= */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-slate-900 mb-16">
            Certificates
          </h2>

          {/* Main Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE - IndiaMart + Contact */}
            <div className="space-y-10">
              {/* Indiamart Box */}
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
                <p className="text-lg font-semibold text-slate-700 mb-4">
                  Indiamart Profile Link
                </p>

                <a
                  href="https://www.indiamart.com/trikaya-fashion-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300 shadow-md"
                >
                  Visit Indiamart Profile →
                </a>

                <p className="mt-6 text-slate-600">For Order Bulk & Sample</p>
              </div>

              {/* Contact Box */}
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 space-y-6">
                <h4 className="text-2xl font-bold text-slate-900">
                  Contact Information
                </h4>

                <div>
                  <p className="text-lg text-slate-700">Sales Inquiry:</p>
                  <p className="font-semibold text-slate-900">
                    Satish Kumar – +91-9990955454
                  </p>
                </div>

                <div>
                  <p className="text-lg text-slate-700">
                    Delivery & Order Confirmation:
                  </p>
                  <p className="font-semibold text-slate-900">+91-7982190064</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Certificate Image */}
            <div className="flex justify-center">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-md w-full">
                <img
                  src={assets.certificate}
                  alt="Company Certificate"
                  className="w-full h-[450px] object-contain bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT PILLARS ================= */}
      <section className="bg-slate-100 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-20"
          >
            What We Specialize In
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: PackageIcon,
                title: "Plastic Bags",
                desc: "High-strength plastic bags for retail, food packaging, and industrial use.",
              },
              {
                icon: Factory,
                title: "Towels",
                desc: "Soft, absorbent towels ideal for hospitality, healthcare, and personal use.",
              },
              {
                icon: ShieldCheck,
                title: "Tissue Products",
                desc: "Hygienically manufactured tissue products meeting strict quality standards.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-transform duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY TRUST US ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-20"
          >
            Why Businesses Trust Us
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Award, text: "Consistent Quality" },
              { icon: ShieldCheck, text: "Hygiene & Safety" },
              { icon: Truck, text: "Reliable Delivery" },
              { icon: Leaf, text: "Responsible Manufacturing" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white border border-slate-200 rounded-2xl p-8 hover:border-teal-500 hover:shadow-lg transition-transform duration-300"
              >
                <item.icon size={32} className="mx-auto mb-4 text-teal-600" />
                <p className="font-medium text-slate-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-teal-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-20 w-56 h-56 bg-cyan-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200/30 rounded-full blur-2xl" />
        </div>

        {/* Floating strokes */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-24 left-1/4 w-40 h-[6px] bg-teal-300/30 rotate-45 rounded-full" />
          <span className="absolute bottom-32 right-1/4 w-32 h-[6px] bg-cyan-300/30 -rotate-45 rounded-full" />
          <span className="absolute top-1/3 right-16 w-20 h-[6px] bg-rose-300/30 rotate-12 rounded-full" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 items-center">
            {/* Left Images */}
            <div className="hidden lg:flex flex-col gap-10 items-end">
              <img
                src={assets.garbageImg}
                alt="Garbage Bags"
                className="w-40 rounded-xl shadow-xl hover:-translate-y-2 transition-transform duration-300"
              />
              <img
                src={assets.kitchenTowelImg}
                alt="Kitchen Towels"
                className="w-32 rounded-xl shadow-xl hover:translate-y-2 transition-transform duration-300"
              />
            </div>

            {/* Center Content */}
            <div className="text-center">
              <p className="text-teal-600 font-semibold tracking-widest mb-3">
                ABOUT US
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Trusted Plastic & Flexible{" "}
                <span className="text-teal-500">Packaging Experts</span>
              </h2>
              <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
                We are a highly established and reputable plastic & flexible
                packaging company, delivering innovative, reliable, and scalable
                solutions since 1985.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Our products cater to industries including food & beverages,
                apparel, agro-chemicals, pet foods, cosmetics, automobiles,
                confectionery, and pharmaceuticals.
              </p>
            </div>

            {/* Right Images */}
            <div className="hidden lg:flex flex-col gap-10 items-start">
              <img
                src={assets.KitchenTissueImg}
                alt="Tissue Products"
                className="w-36 rounded-xl shadow-xl hover:-translate-y-2 transition-transform duration-300"
              />
              <img
                src={assets.bulkImg}
                alt="Bulk Orders"
                className="w-44 rounded-xl shadow-xl hover:translate-y-2 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ================= FINAL CTA ================= */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready for Bulk Supply or Partnership?
          </motion.h2>

          <p className="text-slate-300 max-w-3xl mx-auto mb-10">
            After reviewing samples or if you already know your needs — connect
            with our sales team for best pricing, MOQ, and delivery terms.
          </p>

          <a
            href="/contact"
            className="inline-flex px-8 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 transition font-semibold shadow-sm"
          >
            Talk to Sales Team
          </a>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
