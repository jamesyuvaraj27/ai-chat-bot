/**
 * BaseProvider — abstract base class for all AI providers.
 *
 * To add a new provider:
 *   1. Create a file in this directory (e.g. geminiProvider.js)
 *   2. Extend BaseProvider
 *   3. Implement generateResponse(message)
 *   4. Register it in chatService.js
 */
export class BaseProvider {
  constructor(name) {
    this.name = name;
  }

  /**
   * Generate an AI response for the given user message.
   * @param {string} message - The user's message
   * @returns {Promise<string>} The AI-generated response text
   */
  async generateResponse(message) {
    throw new Error(
      `generateResponse() is not implemented for provider "${this.name}". ` +
      'Extend BaseProvider and override this method.'
    );
  }
}

export default BaseProvider;
