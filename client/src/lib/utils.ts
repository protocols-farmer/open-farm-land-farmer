// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely using clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts a human-readable error message from backend API responses.
 * Specifically tuned to handle the refined Global Error Handler on our backend.
 */
export const getApiErrorMessage = (error: any): string => {
  // NEW: Handle NextAuth string errors first
  if (typeof error === "string") return error;

  // 1. Check for the standard data.message from our Global Error Handler
  if (error?.data?.message) return error.data.message;

  // 2. Handle cases where the backend might return an array of errors (like Zod)
  if (Array.isArray(error?.data?.errors) && error.data.errors.length > 0) {
    return error.data.errors[0].message || "Validation failed.";
  }

  // 3. Fallback to standard JS error messages
  if (error?.message) return error.message;

  return "An unexpected error occurred. Please try again.";
};

/**
 * Formats numbers into a compact "K", "M", or "B" format.
 * Example: 1500 -> 1.5K
 */
export function formatCompactNumber(number: number) {
  if (number < 1000) {
    return number.toString();
  }
  if (number < 1000000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  if (number < 1000000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
}

/**
 * Formats a Date into a "Joined Month Year" format for profile pages.
 */
export function formatJoinedDate(dateString: string | Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
