import "./App.css";
import SkipLink from "./components/layout/SkipLink";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/common/Cart";
import { useState } from "react";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <CartProvider>
        <SkipLink />
        <main id="main-content">
          {isCartOpen && <Cart />}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            onKeyDown={(e) => e.key === "Enter" && setIsCartOpen(!isCartOpen)}
            aria-label={isCartOpen ? "close cart" : "Open cart"}>
            //TODO: render total items here
          </button>
          <ProductsPage />
        </main>
      </CartProvider>
    </>
  );
}

export default App;
