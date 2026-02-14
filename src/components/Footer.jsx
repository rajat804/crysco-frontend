import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 pt-16 pb-8 border-t">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-700">Crysco</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Premium quality supplements crafted to enhance your health and
            performance naturally.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <div className="p-3 bg-white rounded-full shadow-md hover:bg-emerald-600 hover:text-white transition duration-300 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="p-3 bg-white rounded-full shadow-md hover:bg-emerald-600 hover:text-white transition duration-300 cursor-pointer">
              <FaInstagram />
            </div>
            <div className="p-3 bg-white rounded-full shadow-md hover:bg-emerald-600 hover:text-white transition duration-300 cursor-pointer">
              <FaTwitter />
            </div>
            <div className="p-3 bg-white rounded-full shadow-md hover:bg-emerald-600 hover:text-white transition duration-300 cursor-pointer">
              <FaYoutube />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-emerald-600 cursor-pointer transition">Home</li>
            <li className="hover:text-emerald-600 cursor-pointer transition">Shop</li>
            <li className="hover:text-emerald-600 cursor-pointer transition">New Arrivals</li>
            <li className="hover:text-emerald-600 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">
            Categories
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="hover:text-emerald-600 cursor-pointer transition">Protein</li>
            <li className="hover:text-emerald-600 cursor-pointer transition">Vitamins</li>
            <li className="hover:text-emerald-600 cursor-pointer transition">Fitness</li>
            <li className="hover:text-emerald-600 cursor-pointer transition">Accessories</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-700 mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>Email: support@wellnesspro.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t pt-6 text-center text-gray-500 text-sm">
        © 2026 WellnessPro. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
