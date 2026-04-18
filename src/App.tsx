import "./App.css";
import SkipLink from "./components/layout/SkipLink";
import NavBar from "./components/layout/NavBar";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/common/Cart";
import Checkout from "./components/common/Checkout";
import { useState } from "react";

type View = "products" | "cart" | "checkout";

function App() {
  const [currentView, setCurrentView] = useState<View>("products");
  return (
    <>
      <CartProvider>
        <SkipLink />
        <NavBar
          isCartOpen={currentView !== "products"}
          onCartClick={() => setCurrentView(v => v !== "products" ? "products" : "cart")}
        />
        <main id="main-content">
          {currentView === "cart" && (
            <Cart onProceedToCheckout={() => setCurrentView("checkout")} />
          )}
          {currentView === "checkout" && (
            <Checkout onBackToCart={() => setCurrentView("cart")} />
          )}
          <ProductsPage />
        </main>
      </CartProvider>
    </>
  );
}

export default App;
