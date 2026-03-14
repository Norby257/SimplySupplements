import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { vi, beforeEach } from 'vitest';
import SearchBox from './SearchBox';
import { useVoiceSearch } from '../../hooks/useVoiceSearch';

vi.mock('../../hooks/useVoiceSearch', () => ({
  useVoiceSearch: vi.fn(),
}));

const mockUseVoiceSearch = vi.mocked(useVoiceSearch);

const defaultHook = {
  isSupported: false,
  isListening: false,
  transcript: '',
  error: '',
  startListening: vi.fn(),
  stopListening: vi.fn(),
};

const noop = () => {};

beforeEach(() => {
  mockUseVoiceSearch.mockReturnValue({ ...defaultHook });
});

describe('SearchBox', () => {
  it('renders a search input with an accessible label', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
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

  it('mic button has aria-disabled="true" when voice search is not supported', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('mic button has aria-disabled="false" when voice search is supported', () => {
    mockUseVoiceSearch.mockReturnValue({ ...defaultHook, isSupported: true });
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toHaveAttribute('aria-disabled', 'false');
  });

  it('mic button references the tooltip via aria-describedby (WCAG ARIA6)', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    expect(micButton).toHaveAttribute('aria-describedby', 'mic-tooltip');
  });

  it('tooltip has role="tooltip" for screen reader announcement', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('tooltip shows privacy notice when there is no error', () => {
    render(<SearchBox query="" onQueryChange={noop} />);
    expect(screen.getByRole('tooltip')).toHaveTextContent(/processed by your browser/i);
  });

  it('tooltip shows error message when there is an error', () => {
    mockUseVoiceSearch.mockReturnValue({ ...defaultHook, error: 'not-allowed' });
    render(<SearchBox query="" onQueryChange={noop} />);
    expect(screen.getByRole('tooltip')).toHaveTextContent('not-allowed');
  });

  it('mic button click does not trigger navigation or form submission', async () => {
    const user = userEvent.setup();
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /search by voice/i });
    await user.click(micButton);
  });

  it('aria-label changes to "Stop Listening" when mic is active', () => {
    mockUseVoiceSearch.mockReturnValue({ ...defaultHook, isSupported: true, isListening: true });
    render(<SearchBox query="" onQueryChange={noop} />);
    expect(screen.getByRole('button', { name: /stop listening/i })).toBeInTheDocument();
  });

  it('mic button has listening class when active', () => {
    mockUseVoiceSearch.mockReturnValue({ ...defaultHook, isSupported: true, isListening: true });
    render(<SearchBox query="" onQueryChange={noop} />);
    const micButton = screen.getByRole('button', { name: /stop listening/i });
    expect(micButton).toHaveClass('mic-button--listening');
  });

  it('aria-live region announces when listening starts', () => {
    mockUseVoiceSearch.mockReturnValue({ ...defaultHook, isSupported: true, isListening: true });
    render(<SearchBox query="" onQueryChange={noop} />);
    const liveRegion = document.querySelector('[aria-live="assertive"]');
    expect(liveRegion).toHaveTextContent(/listening/i);
  });

  it('aria-live region announces transcript when heard', () => {
    mockUseVoiceSearch.mockReturnValue({ ...defaultHook, transcript: 'Magnesium' });
    render(<SearchBox query="" onQueryChange={noop} />);
    const liveRegion = document.querySelector('[aria-live="assertive"]');
    expect(liveRegion).toHaveTextContent(/magnesium/i);
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
