import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

const noop = () => {};

describe('SearchBox', () => {
  it('renders a search input with an accessible label', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    // The visible <label> must be associated with the input via htmlFor/id
    const input = screen.getByRole('searchbox', { name: /search products/i });
    expect(input).toBeInTheDocument();
  });

  it('has role="search" landmark so screen readers can navigate to it', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('renders the mic button with aria-label announcing its purpose', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toBeInTheDocument();
  });

  it('mic button has aria-disabled="true" so it stays keyboard-focusable but is announced as unavailable', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('mic button references the tooltip via aria-describedby (WCAG ARIA6)', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toHaveAttribute('aria-describedby', 'mic-tooltip');

    const tooltip = document.getElementById('mic-tooltip');
    expect(tooltip).toHaveTextContent(/coming soon/i);
  });

  it('tooltip has role="tooltip" for screen reader announcement', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    expect(screen.getByRole('tooltip')).toHaveTextContent(/search by voice coming soon/i);
  });

  it('mic button click does not trigger navigation or form submission', async () => {
    const user = userEvent.setup();
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    // Should not throw even if clicked
    await user.click(micButton);
  });

  it('calls onQueryChange when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchBox query="" onQueryChange={handleChange} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'v');
    expect(handleChange).toHaveBeenCalledWith('v');
  });

  it('search input reflects the query prop', () => {
    render(<SearchBox query="vitamin D" onQueryChange={noop} />);
    expect(screen.getByRole('searchbox')).toHaveValue('vitamin D');
  });

  it('search input updates as the user types (controlled)', async () => {
    const user = userEvent.setup();
    const Wrapper = () => {
      const [query, setQuery] = useState('');
      return <SearchBox query={query} onQueryChange={setQuery} />;
    };
    render(<Wrapper />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'vitamin D');
    expect(input).toHaveValue('vitamin D');
  });
});
