import axios from 'axios';
import { getApiBaseUrl } from '../utils/helpers';

const api = axios.create({
  baseURL: `${getApiBaseUrl()}/api`,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor — unwrap data or normalise errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Something went wrong. Please try again.';

    return Promise.reject(new Error(message));
  }
);

/**
 * Send a chat message to the backend.
 * @param {string} message - The user's message
 * @returns {Promise<{success: boolean, response: string}>}
 */
export async function sendChatMessage(message) {
  return api.post('/chat', { message });
}

export default api;
