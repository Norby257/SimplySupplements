import { useCallback, useRef, useState } from 'react';

/**
 * Implements the ARIA roving tabindex pattern for grid keyboard navigation.
 * Supports ArrowRight, ArrowLeft, ArrowDown, ArrowUp, Home, End keys.
 *
 * NOTE: COLS_PER_ROW must match the CSS grid column count. For responsive
 * layouts, this value should be computed from the DOM in production.
 */
const COLS_PER_ROW = 3;

export function useGridNavigation(itemCount: number) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>(Array(itemCount).fill(null));

  const focusItem = useCallback(
    (index: number) => {
      if (index >= 0 && index < itemCount) {
        setFocusedIndex(index);
        itemRefs.current[index]?.focus();
      }
    },
    [itemCount]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let nextIndex: number | null = null;

      switch (e.key) {
        case 'ArrowRight':
          if (
            (currentIndex + 1) % COLS_PER_ROW !== 0 &&
            currentIndex + 1 < itemCount
          ) {
            nextIndex = currentIndex + 1;
          }
          break;
        case 'ArrowLeft':
          if (currentIndex % COLS_PER_ROW !== 0) {
            nextIndex = currentIndex - 1;
          }
          break;
        case 'ArrowDown':
          if (currentIndex + COLS_PER_ROW < itemCount) {
            nextIndex = currentIndex + COLS_PER_ROW;
          }
          break;
        case 'ArrowUp':
          if (currentIndex - COLS_PER_ROW >= 0) {
            nextIndex = currentIndex - COLS_PER_ROW;
          }
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = itemCount - 1;
          break;
        default:
          return;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        focusItem(nextIndex);
      }
    },
    [itemCount, focusItem]
  );

  return { focusedIndex, setFocusedIndex, handleKeyDown, itemRefs };
}
