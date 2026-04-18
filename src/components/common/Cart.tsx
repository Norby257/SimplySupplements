import { useCart } from "../../context/CartContext";
import { calcSubtotal } from "../../utils/parsePrice";
import ProductCardShell from "./ProductCardShell";
import type { CartItem } from "../../types/CartItem";

type CartItemActionProps = {
  cartItem: CartItem;
  onRemove: (id: number) => void;
};

const CartItemAction = ({ cartItem, onRemove }: CartItemActionProps) => (
  <div className="product-card__cart-actions">
    <span aria-label={`Quantity: ${cartItem.quantity}`}>
      Qty: {cartItem.quantity}
    </span>
    <button
      type="button"
      className="product-card__cta"
      aria-label={`Remove ${cartItem.product.name} from cart`}
      onClick={() => onRemove(cartItem.product.id)}>
      Remove
    </button>
  </div>
);

type CartProps = { onProceedToCheckout: () => void };

const Cart = ({ onProceedToCheckout }: CartProps) => {
  const { items, removeFromCart, totalItems } = useCart();
  const subTotal = calcSubtotal(items);

  return (
    <div>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-item-list">
            {items.map((cartItem) => (
              <li key={cartItem.product.id} className="product-card">
                <ProductCardShell
                  product={cartItem.product}
                  action={
                    <CartItemAction
                      cartItem={cartItem}
                      onRemove={removeFromCart}
                    />
                  }
                />
              </li>
            ))}
          </ul>
          <p>Items in cart: {totalItems}</p>
          <p>Subtotal price: {subTotal.toFixed(2)}</p>
          <button
            aria-label="Proceed to checkout"
            onClick={onProceedToCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
