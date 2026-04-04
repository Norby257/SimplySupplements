import { useCart } from "../../context/CartContext";
import "./NavBar.css";

const CartIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

type NavBarProps = {
  isCartOpen: boolean;
  onCartClick: () => void;
};

const NavBar = ({ isCartOpen, onCartClick }: NavBarProps) => {
  const { totalItems } = useCart();

  return (
    <nav className="navbar" aria-label="Main navigation">
      <span className="navbar__brand">SimplySupplements</span>
      <ul className="navbar__links" role="list">
        <li>
          <button
            className="navbar__btn navbar__cart-btn"
            onClick={onCartClick}
            aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            aria-expanded={isCartOpen}>
            <CartIcon />
            {totalItems > 0 && (
              <span className="cart-badge" aria-hidden="true">
                {totalItems}
              </span>
            )}
          </button>
        </li>
        <li>
          <button
            className="navbar__btn"
            aria-label="Past orders, coming soon"
            aria-disabled="true">
            Past Orders
          </button>
        </li>
        <li>
          <button
            className="navbar__btn"
            aria-label="Log in, coming soon"
            aria-disabled="true">
            Log In
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
