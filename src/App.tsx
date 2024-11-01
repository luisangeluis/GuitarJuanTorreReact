import { useState } from "react";
import "./index.css";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import useCart from "./hooks/useCart";
import { db } from "./utils/db";

export default function App() {
  const [guitars, setGuitars] = useState(db);
  const {
    cart,
    addToCart,
    deleteFromCart,
    incrementQuantity,
    decrementQuantity,
    cleanCart,
    isEmpty,
    cartToTal
  } = useCart();

  return (
    <div className="App">
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        cleanCart={cleanCart}
        isEmpty = {isEmpty}
        cartToTal = {cartToTal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {guitars.map((g) => (
            <Guitar guitar={g} key={g.id} addToCart={addToCart} />
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
