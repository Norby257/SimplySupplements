import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "../../context/CartContext";
import Checkout from "./Checkout";
import type { Product } from "../../types/Product";

const MOCK_PRODUCT_A: Product = {
  id: 1,
  name: "Vitamin D3",
  description: "Supports immune function.",
  price: "$19.99",
  category: "Vitamins",
};

const MOCK_PRODUCT_B: Product = {
  id: 2,
  name: "Omega-3",
  description: "Supports heart health.",
  price: "$24.99",
  category: "Fatty Acids",
};

const AddToCartHelper = () => {
  const { addToCart } = useCart();
  return (
    <>
      <button onClick={() => addToCart(MOCK_PRODUCT_A)}>Add Vitamin D3</button>
      <button onClick={() => addToCart(MOCK_PRODUCT_B)}>Add Omega-3</button>
    </>
  );
};

const renderCheckout = (onBackToCart = vi.fn()) =>
  render(
    <CartProvider>
      <AddToCartHelper />
      <Checkout onBackToCart={onBackToCart} />
    </CartProvider>
  );

describe("Checkout", () => {
  it("renders order summary item names, quantities, unit prices, and line totals", async () => {
    const user = userEvent.setup();
    renderCheckout();
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    await user.click(screen.getByRole("button", { name: /add omega-3/i }));
    // names
    expect(screen.getByRole("cell", { name: "Vitamin D3" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Omega-3" })).toBeInTheDocument();
    // quantities
    const qtyCells = screen.getAllByRole("cell", { name: "1" });
    expect(qtyCells).toHaveLength(2);
    // unit prices
    expect(screen.getByRole("cell", { name: "$19.99" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "$24.99" })).toBeInTheDocument();
    // line totals
    expect(screen.getByRole("cell", { name: "19.99" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "24.99" })).toBeInTheDocument();
  });

  it("renders the correct subtotal", async () => {
    const user = userEvent.setup();
    renderCheckout();
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    await user.click(screen.getByRole("button", { name: /add omega-3/i }));
    // $19.99 + $24.99 = $44.98
    expect(screen.getByText(/subtotal:\s*44\.98/i)).toBeInTheDocument();
  });

  it("renders Shipping placeholder heading", () => {
    renderCheckout();
    expect(screen.getByRole("heading", { name: /shipping/i, level: 3 })).toBeInTheDocument();
  });

  it("renders Payment placeholder heading", () => {
    renderCheckout();
    expect(screen.getByRole("heading", { name: /payment/i, level: 3 })).toBeInTheDocument();
  });

  it("renders the Back to Cart button", () => {
    renderCheckout();
    expect(
      screen.getByRole("button", { name: /back to cart/i })
    ).toBeInTheDocument();
  });

  it("calls onBackToCart when Back to Cart is clicked", async () => {
    const user = userEvent.setup();
    const onBackToCart = vi.fn();
    renderCheckout(onBackToCart);
    await user.click(screen.getByRole("button", { name: /back to cart/i }));
    expect(onBackToCart).toHaveBeenCalledTimes(1);
  });
});
