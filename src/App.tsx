import { useEffect, useState } from "react";
import "./index.css";
import { db } from "./utils/db";
import Guitar from "./components/Guitar";
import Header from "./components/Header";

export default function App() {
  console.log("App")
  const initialCart = ()=>{
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }
  const [guitars, setGuitars] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])

  const addToCart = (item) => {
    const itemId = cart.findIndex((i) => i.id === item.id);

    if (itemId >= 0) {
      const updatedCart = [...cart];
      
      if(updatedCart[itemId].quantity < 10) {
        updatedCart[itemId].quantity++;
        setCart(updatedCart);

      };
      
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

  const cleanCart=()=>{
    if(cart.length)
      setCart([]);
  }

  return (
    <div className="App">
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        cleanCart={cleanCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {guitars.map((g) => (
            <Guitar
              guitar={g}
              key={g.id}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
