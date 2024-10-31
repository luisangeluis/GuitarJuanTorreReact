import { useEffect, useState } from "react";
import { db } from "../utils/db";

const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const itemId = cart.findIndex((i) => i.id === item.id);

    if (itemId >= 0) {
      const updatedCart = [...cart];

      if (updatedCart[itemId].quantity < 10) {
        updatedCart[itemId].quantity++;
        setCart(updatedCart);
      }
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const deleteFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);

    setCart(updatedCart);
  };

  const incrementQuantity = (itemId: number) => {
    const index = cart.findIndex((item) => item.id === itemId);

    if (index >= 0) {
      const updatedCart = [...cart];

      if (updatedCart[index].quantity < 10) {
        updatedCart[index].quantity++;
        setCart(updatedCart);
      }
    }
  };

  const decrementQuantity = (itemId: number) => {
    const index = cart.findIndex((item) => item.id === itemId);

    if (index >= 0) {
      const updatedCart = [...cart];

      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity--;
        setCart(updatedCart);
      }
    }
  };

  const cleanCart = () => {
    if (cart.length) setCart([]);
  };

  return {
    cart,
    addToCart,
    deleteFromCart,
    incrementQuantity,
    decrementQuantity,
    cleanCart,
  };
};

export default useCart;
