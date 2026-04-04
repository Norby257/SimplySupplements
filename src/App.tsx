import "./App.css";
import SkipLink from "./components/layout/SkipLink";
import NavBar from "./components/layout/NavBar";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/common/Cart";
import { useState } from "react";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  return (
    <>
      <CartProvider>
        <SkipLink />
        <NavBar
          isCartOpen={isCartOpen}
          onCartClick={toggleCart}
        />
        <main id="main-content">
          {isCartOpen && <Cart />}
          <ProductsPage />
        </main>
      </CartProvider>
    </>
  );
}

export default App;
