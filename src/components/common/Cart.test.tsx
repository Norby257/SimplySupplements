import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "../../context/CartContext";
import Cart from "./Cart";
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

const renderCart = (onProceedToCheckout = vi.fn()) =>
  render(
    <CartProvider>
      <AddToCartHelper />
      <Cart onProceedToCheckout={onProceedToCheckout} />
    </CartProvider>
  );

describe("Cart", () => {
  it("renders 'Your cart is empty.' when no items are present", () => {
    renderCart();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders a list with one item per product added", async () => {
    const user = userEvent.setup();
    renderCart();
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    await user.click(screen.getByRole("button", { name: /add omega-3/i }));
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders item name and price for each cart item", async () => {
    const user = userEvent.setup();
    renderCart();
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    expect(screen.getByText("Vitamin D3")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it("renders the quantity for each cart item", async () => {
    const user = userEvent.setup();
    renderCart();
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    expect(screen.getByLabelText(/quantity: 2/i)).toBeInTheDocument();
  });

  it("removes an item when its Remove button is clicked", async () => {
    const user = userEvent.setup();
    renderCart();
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    await user.click(screen.getByRole("button", { name: /add omega-3/i }));
    await user.click(
      screen.getByRole("button", { name: /remove vitamin d3 from cart/i })
    );
    expect(screen.queryByText("Vitamin D3")).not.toBeInTheDocument();
    expect(screen.getByText("Omega-3")).toBeInTheDocument();
  });

  it("displays the correct subtotal", async () => {
    const user = userEvent.setup();
    renderCart();
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    await user.click(screen.getByRole("button", { name: /add omega-3/i }));
    // $19.99 + $24.99 = $44.98
    expect(screen.getByText(/subtotal price:\s*44\.98/i)).toBeInTheDocument();
  });

  it("renders the Proceed to Checkout button and calls onProceedToCheckout when clicked", async () => {
    const user = userEvent.setup();
    const onProceedToCheckout = vi.fn();
    renderCart(onProceedToCheckout);
    await user.click(screen.getByRole("button", { name: /add vitamin d3/i }));
    const btn = screen.getByRole("button", { name: /proceed to checkout/i });
    expect(btn).toBeInTheDocument();
    await user.click(btn);
    expect(onProceedToCheckout).toHaveBeenCalledTimes(1);
  });
});
