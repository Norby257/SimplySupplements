import { forwardRef } from 'react';
import type { Product } from '../../types/Product';
import './ProductCard.css';

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
    return (
      <div
        ref={ref}
        className="product-card"
        role="gridcell"
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        aria-label={`${product.name}, ${product.price}`}
      >
        {/* Decorative placeholder image area */}
        <div className="product-card__image" aria-hidden="true">
          <span className="product-card__image-icon">⬜</span>
          <span className="product-card__image-label">Product image</span>
        </div>

        <div className="product-card__body">
          <p className="product-card__category">{product.category}</p>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__description">{product.description}</p>
          <div className="product-card__footer">
            <span
              className="product-card__price"
              aria-label={`Price: ${product.price}`}
            >
              {product.price}
            </span>
            <button
              type="button"
              className="product-card__cta"
              tabIndex={-1}
              aria-label={`Add ${product.name} to cart`}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
