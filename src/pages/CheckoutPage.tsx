import { useState } from "react";
import Cart from "../components/common/Cart";
import Checkout from "../components/common/Checkout";

type CheckoutView = "cart" | "checkout";

const CheckoutPage = () => {
  const [view, setView] = useState<CheckoutView>("cart");

  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <h1>{view === "cart" ? "Your Cart" : "Checkout"}</h1>
      </header>
      {view === "cart" && (
        <Cart onProceedToCheckout={() => setView("checkout")} />
      )}
      {view === "checkout" && (
        <Checkout onBackToCart={() => setView("cart")} />
      )}
    </div>
  );
};

export default CheckoutPage;
