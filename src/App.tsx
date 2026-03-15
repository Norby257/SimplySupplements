import "./App.css";
import SkipLink from "./components/layout/SkipLink";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <SkipLink />
        <main id="main-content">
          <ProductsPage />
        </main>
      </CartProvider>
    </>
  );
}

export default App;
