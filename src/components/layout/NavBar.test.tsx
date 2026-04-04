import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, useCart } from "../../context/CartContext";
import NavBar from "./NavBar";
import type { Product } from "../../types/Product";

const MOCK_PRODUCT: Product = {
  id: 1,
  name: "Vitamin D3",
  description: "Supports immune function.",
  price: "$19.99",
  category: "Vitamins"
};

// Helper to add items to the cart from within the provider tree
const AddToCartHelper = () => {
  const { addToCart } = useCart();
  return (
    <button onClick={() => addToCart(MOCK_PRODUCT)}>Add to cart</button>
  );
};

const renderNavBar = (isCartOpen = false, onCartClick = vi.fn()) =>
  render(
    <CartProvider>
      <NavBar isCartOpen={isCartOpen} onCartClick={onCartClick} />
      <AddToCartHelper />
    </CartProvider>
  );

describe("NavBar", () => {
  it("renders a navigation landmark", () => {
    renderNavBar();
    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
  });

  it("renders the brand name", () => {
    renderNavBar();
    expect(screen.getByText("SimplySupplements")).toBeInTheDocument();
  });

  it("renders the cart button", () => {
    renderNavBar();
    expect(screen.getByRole("button", { name: /^cart,/i })).toBeInTheDocument();
  });

  it("cart button has aria-expanded=false when cart is closed", () => {
    renderNavBar(false);
    expect(screen.getByRole("button", { name: /^cart,/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("cart button has aria-expanded=true when cart is open", () => {
    renderNavBar(true);
    expect(screen.getByRole("button", { name: /^cart,/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("calls onCartClick when the cart button is clicked", async () => {
    const user = userEvent.setup();
    const onCartClick = vi.fn();
    renderNavBar(false, onCartClick);
    await user.click(screen.getByRole("button", { name: /^cart,/i }));
    expect(onCartClick).toHaveBeenCalledTimes(1);
  });

  it("does not show the badge when the cart is empty", () => {
    renderNavBar();
    expect(document.querySelector(".cart-badge")).not.toBeInTheDocument();
  });

  it("shows the badge with the correct count when items are added", async () => {
    const user = userEvent.setup();
    renderNavBar();
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(document.querySelector(".cart-badge")).toHaveTextContent("1");
  });

  it("cart button aria-label reflects the item count", async () => {
    const user = userEvent.setup();
    renderNavBar();
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(
      screen.getByRole("button", { name: /cart, 1 item$/i })
    ).toBeInTheDocument();
  });

  it("renders Past Orders button as aria-disabled", () => {
    renderNavBar();
    expect(
      screen.getByRole("button", { name: /past orders/i })
    ).toHaveAttribute("aria-disabled", "true");
  });

  it("renders Log In button as aria-disabled", () => {
    renderNavBar();
    expect(
      screen.getByRole("button", { name: /log in/i })
    ).toHaveAttribute("aria-disabled", "true");
  });
});
