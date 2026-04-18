import { forwardRef } from "react";
import type { Product } from "../../types/Product";
import { useCart } from "../../context/CartContext";
import ProductCardShell from "./ProductCardShell";

interface ProductCardProps {
  product: Product;
  tabIndex: number;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
}

/**
 * A single product card using the ARIA roving tabindex pattern.
 * Each card is a gridcell — only the focused card holds tabIndex=0;
 * all others hold tabIndex=-1. Arrow key navigation is handled by the parent.
 *
 * The "Add to cart" button has tabIndex=-1 so Tab doesn't cycle through every
 * button in the grid. Activating a card via Enter/Space would trigger the
 * primary action in a full implementation.
 */
const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, tabIndex, onKeyDown, onFocus }, ref) => {
    const { addToCart } = useCart();
    return (
      <div
        ref={ref}
        className="product-card"
        role="gridcell"
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        aria-label={`${product.name}, ${product.price}`}>
        <ProductCardShell
          product={product}
          action={
            <button
              onClick={() => addToCart(product)}
              type="button"
              className="product-card__cta"
              tabIndex={-1}
              aria-label={`Add ${product.name} to cart`}>
              Add to cart
            </button>
          }
        />
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
