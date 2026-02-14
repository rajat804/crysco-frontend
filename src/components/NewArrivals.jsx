import ProductCard from "./ProductCard";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/yello1.jpg";
import img6 from "../assets/yello2.jpg";
import img7 from "../assets/9.jpg";
import img8 from "../assets/6.jpg";

const products = [
  {
    id: 1,
    name: "Glutathione Fizz Tab",
    price: 899,
    oldPrice: 1899,
    discount: 52,
    image1:img1,
    image2: img2,
  },
  {
    id: 2,
    name: "Asthi-Soola Kit",
    price: 799,
    oldPrice: 1599,
    discount: 50,
    image1: img3,
    image2: img4,
  },
  {
    id: 3,
    name: "Omega 3 Capsules",
    price: 699,
    oldPrice: 1299,
    discount: 46,
    image1:img5,
    image2:img6,
  },
  {
    id: 4,
    name: "Calcium + D3",
    price: 599,
    oldPrice: 1199,
    discount: 50,
    image1: img7,
    image2:img8,
  },
  {
    id: 5,
    name: "Vitamin B Complex",
    price: 499,
    oldPrice: 999,
    discount: 50,
    image1: img1,
    image2: img2,
  },
  {
    id: 6,
    name: "Protein Powder",
    price: 1299,
    oldPrice: 1999,
    discount: 35,
    image1: img3,
    image2: img4,
  },
  {
    id: 7,
    name: "Hair Growth Tablets",
    price: 899,
    oldPrice: 1499,
    discount: 40,
    image1: img5,
    image2: img6,
  },
  {
    id: 8,
    name: "Immunity Booster",
    price: 699,
    oldPrice: 1399,
    discount: 50,
    image1: img7,
    image2: img8,
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
