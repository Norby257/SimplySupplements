import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../types/Product';

const MOCK_PRODUCT: Product = {
  id: 1,
  name: 'Vitamin D3',
  description: 'Supports immune function.',
  price: '$19.99',
  category: 'Vitamins',
};

const renderCard = (overrides?: Partial<{ tabIndex: number }>) => {
  const ref = createRef<HTMLDivElement>();
  const onKeyDown = vi.fn();
  const onFocus = vi.fn();
  return {
    ...render(
      <ProductCard
        product={MOCK_PRODUCT}
        tabIndex={overrides?.tabIndex ?? 0}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        ref={ref}
      />
    ),
    onKeyDown,
    onFocus,
  };
};

describe('ProductCard', () => {
  it('renders product name and price', () => {
    renderCard();
    expect(screen.getByText('Vitamin D3')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  it('renders with role="gridcell" so it participates in the ARIA grid', () => {
    renderCard();
    expect(screen.getByRole('gridcell')).toBeInTheDocument();
  });

  it('has a descriptive aria-label combining name and price', () => {
    renderCard();
    const cell = screen.getByRole('gridcell');
    expect(cell).toHaveAttribute('aria-label', 'Vitamin D3, $19.99');
  });

  it('has tabIndex=0 when it is the focused card (roving tabindex)', () => {
    renderCard({ tabIndex: 0 });
    expect(screen.getByRole('gridcell')).toHaveAttribute('tabindex', '0');
  });

  it('has tabIndex=-1 when it is not the focused card', () => {
    renderCard({ tabIndex: -1 });
    expect(screen.getByRole('gridcell')).toHaveAttribute('tabindex', '-1');
  });

  it('renders the "Add to cart" button with an accessible label', () => {
    renderCard();
    const button = screen.getByRole('button', { name: /add vitamin d3 to cart/i });
    expect(button).toBeInTheDocument();
  });

  it('"Add to cart" button has tabIndex=-1 so Tab skips it during grid navigation', () => {
    renderCard();
    const button = screen.getByRole('button', { name: /add vitamin d3 to cart/i });
    expect(button).toHaveAttribute('tabindex', '-1');
  });

  it('renders product category', () => {
    renderCard();
    expect(screen.getByText('Vitamins')).toBeInTheDocument();
  });

  it('price span has aria-label for unambiguous screen reader output', () => {
    renderCard();
    const price = screen.getByLabelText(/price: \$19\.99/i);
    expect(price).toBeInTheDocument();
  });
});
