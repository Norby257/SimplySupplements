import './SearchBox.css';

const MicIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const SearchBox = () => {
  return (
    <div className="search-container" role="search">
      <label htmlFor="product-search" className="search-label">
        Search Products
      </label>
      <div className="search-input-wrapper">
        <input
          id="product-search"
          type="search"
          className="search-input"
          placeholder="Search supplements..."
          autoComplete="off"
        />
        {/* Mic button uses aria-disabled instead of disabled so it remains
            keyboard-focusable and screen readers announce it as unavailable. */}
        <div className="mic-wrapper">
          <button
            type="button"
            className="mic-button"
            aria-label="Search by voice"
            aria-describedby="mic-tooltip"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
          >
            <MicIcon />
          </button>
          <div id="mic-tooltip" role="tooltip" className="tooltip">
            Search by voice coming soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
