import type { Product } from '../types/Product';
import { useGridNavigation } from '../hooks/useGridNavigation';
import ProductCard from '../components/common/ProductCard';
import SearchBox from '../components/common/SearchBox';
import './ProductsPage.css';

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Vitamin D3 + K2',
    description: 'Supports bone density and immune function with synergistic D3 and K2 formula.',
    price: '$24.99',
    category: 'Vitamins',
  },
  {
    id: 2,
    name: 'Omega-3 Fish Oil',
    description: 'High-potency EPA & DHA to support heart, brain, and joint health.',
    price: '$29.99',
    category: 'Omega Fatty Acids',
  },
  {
    id: 3,
    name: 'Magnesium Glycinate',
    description: 'Highly bioavailable form of magnesium to support relaxation and sleep quality.',
    price: '$19.99',
    category: 'Minerals',
  },
  {
    id: 4,
    name: 'Whey Protein Isolate',
    description: 'Fast-absorbing protein to support muscle repair and recovery after exercise.',
    price: '$49.99',
    category: 'Protein',
  },
  {
    id: 5,
    name: 'Probiotic 50 Billion CFU',
    description: '10-strain blend to support gut microbiome balance and digestive health.',
    price: '$34.99',
    category: 'Gut Health',
  },
  {
    id: 6,
    name: 'Ashwagandha KSM-66',
    description: 'Clinically studied adaptogen to help manage stress and promote mental clarity.',
    price: '$27.99',
    category: 'Adaptogens',
  },
];

const ProductsPage = () => {
  const { focusedIndex, setFocusedIndex, handleKeyDown, itemRefs } =
    useGridNavigation(PLACEHOLDER_PRODUCTS.length);

  return (
    <div className="products-page">
      <header className="products-page__header">
        <h1 className="products-page__title">Our Products</h1>
        <p className="products-page__subtitle">
          Supplement your health with evidence-based nutrition
        </p>
      </header>

      <SearchBox />

      <section aria-label="Product catalog">
        {/* role="grid" with roving tabindex enables arrow key navigation
            between cards per WCAG 2.1 SC 2.1.1 (Keyboard) */}
        <div
          role="grid"
          aria-label="Products"
          aria-rowcount={Math.ceil(PLACEHOLDER_PRODUCTS.length / 3)}
          className="products-grid"
        >
          {PLACEHOLDER_PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              tabIndex={focusedIndex === index ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedIndex(index)}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </section>

      {/* Keyboard navigation hint for sighted keyboard users */}
      <p className="products-page__keyboard-hint" aria-live="polite">
        <kbd>Tab</kbd> to enter the product grid &nbsp;·&nbsp; Arrow keys to
        navigate between products &nbsp;·&nbsp; <kbd>Enter</kbd> to select
      </p>
    </div>
  );
};

export default ProductsPage;
