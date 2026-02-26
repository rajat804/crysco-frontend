import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { token } = useAuth();

  const fetchCart = async () => {
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const totalQty = data.items?.length || 0;

      setCartCount(totalQty || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCartCount(0);
    }
  }, [token]);

  return (
    <CartContext.Provider value={{ cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);