//src/lib/hooks/useDebounce.ts
"use client";

import { useState, useEffect } from "react";

/**
 * A custom React hook that debounces a value.
 * It's useful for delaying an action (like an API call) until the user has stopped typing.
 * @param value The value to debounce (e.g., a search term from an input).
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value, which only updates after the delay has passed.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
