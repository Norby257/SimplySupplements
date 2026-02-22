import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsPage from './ProductsPage';

describe('ProductsPage', () => {
  describe('Page structure', () => {
    it('renders the page heading', () => {
      render(<ProductsPage />);
      expect(
        screen.getByRole('heading', { name: /our products/i, level: 1 })
      ).toBeInTheDocument();
    });

    it('renders a search landmark (role="search")', () => {
      render(<ProductsPage />);
      expect(screen.getByRole('search')).toBeInTheDocument();
    });

    it('renders a product catalog section with an accessible label', () => {
      render(<ProductsPage />);
      expect(screen.getByRole('region', { name: /product catalog/i })).toBeInTheDocument();
    });
  });

  describe('Product grid', () => {
    it('renders role="grid" for ARIA grid keyboard pattern', () => {
      render(<ProductsPage />);
      expect(screen.getByRole('grid', { name: /products/i })).toBeInTheDocument();
    });

    it('renders 6 placeholder product cards', () => {
      render(<ProductsPage />);
      const grid = screen.getByRole('grid', { name: /products/i });
      const cards = within(grid).getAllByRole('gridcell');
      expect(cards).toHaveLength(6);
    });

    it('first card has tabIndex=0 on initial render (roving tabindex)', () => {
      render(<ProductsPage />);
      const cards = screen.getAllByRole('gridcell');
      expect(cards[0]).toHaveAttribute('tabindex', '0');
    });

    it('all other cards have tabIndex=-1 on initial render', () => {
      render(<ProductsPage />);
      const cards = screen.getAllByRole('gridcell');
      cards.slice(1).forEach((card) => {
        expect(card).toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Keyboard navigation — arrow keys (WCAG 2.1.1)', () => {
    it('ArrowRight moves focus from card 0 to card 1', async () => {
      const user = userEvent.setup();
      render(<ProductsPage />);
      const cards = screen.getAllByRole('gridcell');

      cards[0].focus();
      await user.keyboard('{ArrowRight}');

      expect(cards[1]).toHaveFocus();
    });

    it('ArrowDown moves focus from card 0 to card 3 (next row)', async () => {
      const user = userEvent.setup();
      render(<ProductsPage />);
      const cards = screen.getAllByRole('gridcell');

      cards[0].focus();
      await user.keyboard('{ArrowDown}');

      expect(cards[3]).toHaveFocus();
    });

    it('ArrowLeft does not move focus when on the first card in a row', async () => {
      const user = userEvent.setup();
      render(<ProductsPage />);
      const cards = screen.getAllByRole('gridcell');

      await act(async () => { cards[0].focus(); });
      await user.keyboard('{ArrowLeft}');

      // Should stay on card 0
      expect(cards[0]).toHaveFocus();
    });

    it('ArrowRight does not wrap past the last card in a row', async () => {
      const user = userEvent.setup();
      render(<ProductsPage />);
      const cards = screen.getAllByRole('gridcell');

      // Card 2 is the last in the first row (cols 0, 1, 2)
      await act(async () => { cards[2].focus(); });
      await user.keyboard('{ArrowRight}');

      expect(cards[2]).toHaveFocus();
    });

    it('Home moves focus to the first card', async () => {
      const user = userEvent.setup();
      render(<ProductsPage />);
      const cards = screen.getAllByRole('gridcell');

      await act(async () => { cards[4].focus(); });
      await user.keyboard('{Home}');

      expect(cards[0]).toHaveFocus();
    });

    it('End moves focus to the last card', async () => {
      const user = userEvent.setup();
      render(<ProductsPage />);
      const cards = screen.getAllByRole('gridcell');

      cards[0].focus();
      await user.keyboard('{End}');

      expect(cards[5]).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('keyboard navigation hint is present for sighted keyboard users', () => {
      render(<ProductsPage />);
      expect(screen.getByText(/arrow keys/i)).toBeInTheDocument();
    });
  });
});
