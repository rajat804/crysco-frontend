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
        className="bg-black text-white px-6 py-2 rounded-lg"
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