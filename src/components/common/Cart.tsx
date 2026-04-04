import { useCart } from "../../context/CartContext";
import { parsePrice } from "../../utils/parsePrice";

const Cart = () => {
  const { items, removeFromCart, totalItems } = useCart();

  const subTotal = items.reduce(
    (sum, i) => sum + parsePrice(i.product.price) * i.quantity,
    0
  );
  //TODO: consider converting this into a checkout page component
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
        </>
      )}
    </div>
  );
};

export default Cart;
