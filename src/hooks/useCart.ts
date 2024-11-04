import { useEffect, useState } from "react";
import { db } from "../utils/db";

const useCart = () => {
  const initialCart = ():CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item:Guitar) => {
    const itemId = cart.findIndex((i) => i.id === item.id);

    if (itemId >= 0) {
      const updatedCart = [...cart];

      if (updatedCart[itemId].quantity < 10) {
        updatedCart[itemId].quantity++;
        setCart(updatedCart);
      }
    } else {
      const newItem : CartItem = {...item,quantity:1}
      setCart([...cart, newItem]);
    }
  };

  const deleteFromCart = (itemId:CartItem["id"]) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);

    setCart(updatedCart);
  };

  const incrementQuantity = (itemId: CartItem["id"]) => {
    const index = cart.findIndex((item) => item.id === itemId);

    if (index >= 0) {
      const updatedCart = [...cart];

      if (updatedCart[index].quantity < 10) {
        updatedCart[index].quantity++;
        setCart(updatedCart);
      }
    }
  };

  const decrementQuantity = (itemId: CartItem["id"]) => {
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

  const isEmpty = () => cart.length === 0;
  const cartToTal =()=> cart.reduce((accum:any,current:any)=>accum+(current.quantity*current.price),0)

  return {
    cart,
    addToCart,
    deleteFromCart,
    incrementQuantity,
    decrementQuantity,
    cleanCart,
    isEmpty,
    cartToTal
  };
};

export default useCart;
