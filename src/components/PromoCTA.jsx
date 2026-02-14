const PromoCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-100 via-teal-100 to-sky-100 relative overflow-hidden">

      {/* Soft Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/40"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-5xl font-bold text-emerald-700 leading-tight">
          Ready to Elevate Your Wellness?
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Premium quality supplements designed to support your healthy lifestyle.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300 shadow-md hover:shadow-xl">
            Shop Now
          </button>

          <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition duration-300">
            View Products
          </button>

        </div>

      </div>
    </section>
  );
};

export default PromoCTA;
