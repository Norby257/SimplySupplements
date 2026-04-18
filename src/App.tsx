import "./App.css";
import SkipLink from "./components/layout/SkipLink";
import NavBar from "./components/layout/NavBar";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";

type View = "products" | "checkout";

function App() {
  const [currentView, setCurrentView] = useState<View>("products");
  return (
    <>
      <CartProvider>
        <SkipLink />
        <NavBar
          isCartOpen={currentView === "checkout"}
          onCartClick={() => setCurrentView(v => v === "products" ? "checkout" : "products")}
        />
        <main id="main-content">
          {currentView === "products" && <ProductsPage />}
          {currentView === "checkout" && <CheckoutPage />}
        </main>
      </CartProvider>
    </>
  );
}

export default App;
