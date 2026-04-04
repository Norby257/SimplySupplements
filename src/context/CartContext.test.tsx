import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "./CartContext";
import type { Product } from "../types/Product";

const MOCK_PRODUCT: Product = {
  id: 1,
  name: "Vitamin D3",
  description: "Supports immune function.",
  price: "$19.99",
  category: "Vitamins"
};

const MOCK_PRODUCT_2: Product = {
  id: 2,
  name: "Magnesium",
  description: "Supports muscle function.",
  price: "$14.99",
  category: "Minerals"
};

// Helper component to interact with and observe cart context in tests
const CartTestHelper = () => {
  const { totalItems, addToCart, removeFromCart } = useCart();
  return (
    <div>
      <span data-testid="total">{totalItems}</span>
      <button onClick={() => addToCart(MOCK_PRODUCT)}>Add product 1</button>
      <button onClick={() => addToCart(MOCK_PRODUCT_2)}>Add product 2</button>
      <button onClick={() => removeFromCart(MOCK_PRODUCT.id)}>
        Remove product 1
      </button>
    </div>
  );
};

describe("CartStatus", () => {
  it("does not render the badge when cart is empty", () => {
    render(<CartProvider />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("has an accessible aria-label reflecting the item count", () => {
    render(<CartProvider />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "0 in cart"
    );
  });

  it("shows the badge when a product is added to the cart", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHelper />
      </CartProvider>
    );
    expect(document.querySelector(".cart-badge")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /add product 1/i }));
    expect(document.querySelector(".cart-badge")).toBeInTheDocument();
  });

  it("increments totalItems when the same product is added again", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHelper />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: /add product 1/i }));
    await user.click(screen.getByRole("button", { name: /add product 1/i }));
    expect(screen.getByTestId("total")).toHaveTextContent("2");
  });

  it("decrements totalItems when a product is removed from the cart", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHelper />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: /add product 1/i }));
    expect(screen.getByTestId("total")).toHaveTextContent("1");
    await user.click(screen.getByRole("button", { name: /remove product 1/i }));
    expect(screen.getByTestId("total")).toHaveTextContent("0");
  });

  it("totalItems reflects quantity across multiple distinct products", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHelper />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: /add product 1/i }));
    await user.click(screen.getByRole("button", { name: /add product 2/i }));
    expect(screen.getByTestId("total")).toHaveTextContent("2");
  });
});

describe("useCart", () => {
  it("throws when used outside of CartProvider", () => {
    // Suppress the expected console error from React's error boundary
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => render(<CartTestHelper />)).toThrow(
      "useCart must be used within a CartProvider"
    );
    consoleError.mockRestore();
  });
});
