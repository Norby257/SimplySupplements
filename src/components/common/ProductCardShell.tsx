import type { ReactNode } from "react";
import type { Product } from "../../types/Product";
import "./ProductCard.css";

interface ProductCardShellProps {
  product: Product;
  action: ReactNode;
}

const ProductCardShell = ({ product, action }: ProductCardShellProps) => (
  <>
    <div className="product-card__image" aria-hidden="true">
      <span className="product-card__image-icon">⬜</span>
      <span className="product-card__image-label">Product image</span>
    </div>
    <div className="product-card__body">
      <p className="product-card__category">{product.category}</p>
      <h2 className="product-card__name">{product.name}</h2>
      <p className="product-card__description">{product.description}</p>
      <div className="product-card__footer">
        <span
          className="product-card__price"
          aria-label={`Price: ${product.price}`}>
          {product.price}
        </span>
        {action}
      </div>
    </div>
  </>
);

export default ProductCardShell;
