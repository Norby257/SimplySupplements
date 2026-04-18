import { useCart } from "../../context/CartContext";
import { parsePrice, calcSubtotal } from "../../utils/parsePrice";

type CheckoutProps = { onBackToCart: () => void };

const Checkout = ({ onBackToCart }: CheckoutProps) => {
  const { items } = useCart();
  const subTotal = calcSubtotal(items);

  return (
    <div>
      <h2>Order Summary</h2>
      <table>
        <caption>Order summary</caption>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Qty</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Line Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td>{cartItem.product.name}</td>
              <td>{cartItem.quantity}</td>
              <td>{cartItem.product.price}</td>
              <td>
                {(parsePrice(cartItem.product.price) * cartItem.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Subtotal: {subTotal.toFixed(2)}</p>

      <h3>Shipping</h3>
      <p>Shipping details coming soon.</p>

      <h3>Payment</h3>
      <p>Payment details coming soon.</p>

      <button aria-label="Back to cart" onClick={onBackToCart}>
        Back to Cart
      </button>
    </div>
  );
};

export default Checkout;
