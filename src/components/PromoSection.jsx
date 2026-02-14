const PromoSection = () => {
  return (
    <section
      className="relative h-[70vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Discover Premium Wellness Products
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Elevate your lifestyle with our trusted, high-quality health solutions.
        </p>

        <button className="mt-8 bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg hover:shadow-2xl">
          Shop Now
        </button>

      </div>
    </section>
  );
};

export default PromoSection;
