import { useCart } from "./useCart";
import "./CartStatus.css";

export const CartStatus = () => {
  const { totalItems } = useCart();
  return (
    <div className="cart-status" role="status" aria-live="polite" aria-label={`${totalItems} in cart`}>
      {totalItems > 0 && (
        <span className="cart-badge" aria-hidden="true">
          {totalItems}
        </span>
      )}
    </div>
  );
};
