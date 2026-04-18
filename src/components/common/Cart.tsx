import { useCart } from "../../context/CartContext";
import { calcSubtotal } from "../../utils/parsePrice";

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
          {items.map((cartItem) => (
            <div key={cartItem.product.id}>
              <p>Supplement: {cartItem.product.name}</p>
              <p>Price: {cartItem.product.price}</p>
              <p>Quantity: {cartItem.quantity}</p>
              <button
                aria-label={`Remove ${cartItem.product.name} from cart`}
                onClick={() => removeFromCart(cartItem.product.id)}>
                Remove from cart
              </button>
            </div>
          ))}
          <p> Items in cart: {totalItems}</p>
          <p> Subtotal price: {subTotal.toFixed(2)}</p>
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
