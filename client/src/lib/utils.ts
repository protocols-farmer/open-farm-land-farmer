//src/lib/utils.ts
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
export const getApiErrorMessage = (error: any, fallback?: string): string => {
  if (error?.status === "FETCH_ERROR")
    return "Network error. Please check your connection.";
  if (error?.data?.status === "social_account") {
    return "This email is linked to a social provider. Please log in with Google or GitHub.";
  }

  // 2. Extract the raw message/code from various possible locations in the error object
  let rawMessage = error?.data?.message;

  if (
    !rawMessage &&
    Array.isArray(error?.data?.errors) &&
    error.data.errors.length > 0
  ) {
    rawMessage = error.data.errors[0].message;
  }

  if (!rawMessage) {
    rawMessage = error?.message || (typeof error === "string" ? error : null);
  }

  // 3. Translation Map: Swap machine codes for human sentences
  const ERROR_MAP: Record<string, string> = {
    SOCIAL_ACCOUNT_DETECTED:
      "This email is linked to a social provider. Please log in with Google or GitHub.",
    ALREADY_VERIFIED: "Your email is already verified. You're all set!",
    USER_CREATED_BUT_EMAIL_FAILED:
      "Account created! We couldn't send the welcome guide, but you can explore the platform now.",
    INVALID_VERIFICATION_TOKEN:
      "The link has expired or is invalid. Please request a new one.",
  };

  if (rawMessage && ERROR_MAP[rawMessage]) {
    return ERROR_MAP[rawMessage];
  }

  // 4. Final fallback
  return (
    rawMessage || fallback || "An unexpected error occurred. Please try again."
  );
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
