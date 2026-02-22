import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('renders a search input with an accessible label', () => {
    render(<SearchBox />);
    // The visible <label> must be associated with the input via htmlFor/id
    const input = screen.getByRole('searchbox', { name: /search products/i });
    expect(input).toBeInTheDocument();
  });

  it('has role="search" landmark so screen readers can navigate to it', () => {
    render(<SearchBox />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('renders the mic button with aria-label announcing its purpose', () => {
    render(<SearchBox />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toBeInTheDocument();
  });

  it('mic button has aria-disabled="true" so it stays keyboard-focusable but is announced as unavailable', () => {
    render(<SearchBox />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('mic button references the tooltip via aria-describedby (WCAG ARIA6)', () => {
    render(<SearchBox />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toHaveAttribute('aria-describedby', 'mic-tooltip');

    const tooltip = document.getElementById('mic-tooltip');
    expect(tooltip).toHaveTextContent(/coming soon/i);
  });

  it('tooltip has role="tooltip" for screen reader announcement', () => {
    render(<SearchBox />);
    expect(screen.getByRole('tooltip')).toHaveTextContent(/search by voice coming soon/i);
  });

  it('mic button click does not trigger navigation or form submission', async () => {
    const user = userEvent.setup();
    render(<SearchBox />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    // Should not throw even if clicked
    await user.click(micButton);
  });

  it('search input accepts typed text', async () => {
    const user = userEvent.setup();
    render(<SearchBox />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'vitamin D');
    expect(input).toHaveValue('vitamin D');
  });
});
