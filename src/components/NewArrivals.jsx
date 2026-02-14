import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Glutathione Fizz Tab",
    price: 899,
    oldPrice: 1899,
    discount: 52,
    image1:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f21c?auto=format&fit=crop&w=600&q=80",
    image2:
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Asthi-Soola Kit",
    price: 799,
    oldPrice: 1599,
    discount: 50,
    image1:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=600&q=80",
    image2:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Omega 3 Capsules",
    price: 699,
    oldPrice: 1299,
    discount: 46,
    image1:
      "https://images.unsplash.com/photo-1590080877777-95b7c7e9d12f?auto=format&fit=crop&w=600&q=80",
    image2:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Calcium + D3",
    price: 599,
    oldPrice: 1199,
    discount: 50,
    image1:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    image2:
      "https://images.unsplash.com/photo-1628771065403-5ec1f3c98a42?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Vitamin B Complex",
    price: 499,
    oldPrice: 999,
    discount: 50,
    image1:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    image2:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Protein Powder",
    price: 1299,
    oldPrice: 1999,
    discount: 35,
    image1:
      "https://images.unsplash.com/photo-1603398938378-7e6b7d6e6f3b?auto=format&fit=crop&w=600&q=80",
    image2:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Hair Growth Tablets",
    price: 899,
    oldPrice: 1499,
    discount: 40,
    image1:
      "https://images.unsplash.com/photo-1628771065403-5ec1f3c98a42?auto=format&fit=crop&w=600&q=80",
    image2:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Immunity Booster",
    price: 699,
    oldPrice: 1399,
    discount: 50,
    image1:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f21c?auto=format&fit=crop&w=600&q=80",
    image2:
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80",
  },
];

const NewArrivals = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            New Arrivals
          </h2>

          <button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition duration-300 shadow hover:shadow-lg">
            View All Products
          </button>
        </div>

        {/* Responsive Grid */}
        <div
          className="grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4 
                        gap-8"
        >
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
