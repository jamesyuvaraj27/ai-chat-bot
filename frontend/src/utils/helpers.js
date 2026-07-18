// In development, leave empty so requests go through the Vite dev proxy.
// In production, set VITE_API_URL to the backend origin.
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Format a Date object into a human-readable time string.
 */
export function formatTimestamp(date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date instanceof Date ? date : new Date(date));
}

/**
 * Generate a unique ID for messages.
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get the API base URL.
 */
export function getApiBaseUrl() {
  return API_BASE_URL;
}
