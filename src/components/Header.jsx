import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo-removebg-preview.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {name: "Home", path: "/"},
    { name: "Garbage Bags", path: "/garbage-bags" },
    { name: "Kitchen Towel", path: "/kitchen-towel" },
    { name: "Kitchen Tissue", path: "/kitchen-tissue" },
    { name: "Bulk Order", path: "/bulk-order" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F9FAFB] shadow-sm">
      
      {/* TOP SECTION */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        
        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>

        {/* Search (Desktop) */}
        <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-72 border shadow-sm">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="outline-none text-sm w-full bg-transparent"
          />
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-none flex justify-center">
          <NavLink to="/">
            <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Crysco Logo"
                className="w-full h-full object-contain p-2"
              />
            </div>
          </NavLink>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <User className="cursor-pointer text-gray-700 hover:text-emerald-600 transition" />

          <div className="relative cursor-pointer">
            <ShoppingBag className="text-gray-700 hover:text-emerald-600 transition" />
            <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex justify-center gap-10 py-3 bg-white border-t text-sm font-medium">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `relative group transition duration-300 ${
                isActive
                  ? "text-emerald-600"
                  : "text-gray-700 hover:text-emerald-600"
              }`
            }
          >
            {item.name}

            {/* Animated Underline */}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        ))}
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium ${
                  isActive
                    ? "text-emerald-600"
                    : "text-gray-700 hover:text-emerald-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
