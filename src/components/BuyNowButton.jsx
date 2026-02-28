import { useState } from "react";
import BuyNowModal from "./BuyNowModal";
import { useAuth } from "../context/AuthContext";

const BuyNowButton = ({ product }) => {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        Buy Now
      </button>

      <BuyNowModal
        product={product}
        isOpen={open}
        onClose={() => setOpen(false)}
        token={token}
        BASE_URL={BASE_URL}
      />
    </>
  );
};

export default BuyNowButton;