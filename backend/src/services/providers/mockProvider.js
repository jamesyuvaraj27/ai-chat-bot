import BaseProvider from './baseProvider.js';

/**
 * MockProvider — echoes the user's message back.
 * Used during development before a real AI provider is connected.
 */
export class MockProvider extends BaseProvider {
  constructor() {
    super('mock');
  }

  async generateResponse(message) {
    // Simulate a small network delay for realistic UX testing
    await new Promise((resolve) => setTimeout(resolve, 800));
    return `You said: ${message}`;
  }
}

export default MockProvider;
