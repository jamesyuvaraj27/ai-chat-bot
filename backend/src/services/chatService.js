import config from '../config/index.js';
import { LLM_PROVIDERS } from '../constants/index.js';
import MockProvider from './providers/mockProvider.js';
import OpenRouterProvider from './providers/openrouterProvider.js';

// ─── Provider Registry ─────────────────────────────────────────────
// To add a new provider:
//   1. Create a class extending BaseProvider in ./providers/
//   2. Import it here
//   3. Add a case to the switch below
// ────────────────────────────────────────────────────────────────────

/**
 * Resolve the active AI provider based on the LLM_PROVIDER env var.
 */
function createProvider() {
  const providerName = config.llm.provider;

  switch (providerName) {
    case LLM_PROVIDERS.MOCK:
      return new MockProvider();

    case LLM_PROVIDERS.OPENROUTER:
      return new OpenRouterProvider(
        config.llm.openrouterApiKey,
        config.llm.openrouterModel,
        config.llm.baseUrl
      );

    // ── Future providers ──────────────────────────────────────────
    // case LLM_PROVIDERS.CLAUDE:
    //   return new ClaudeProvider(config.llm.apiKey);
    //
    // case LLM_PROVIDERS.OPENAI:
    //   return new OpenAIProvider(config.llm.apiKey);
    //
    // case LLM_PROVIDERS.OLLAMA:
    //   return new OllamaProvider(config.llm.baseUrl);
    //
    // case LLM_PROVIDERS.DEEPSEEK:
    //   return new DeepSeekProvider(config.llm.apiKey);
    // ──────────────────────────────────────────────────────────────

    default:
      console.warn(
        `Unknown LLM_PROVIDER "${providerName}" — falling back to mock.`
      );
      return new MockProvider();
  }
}

const provider = createProvider();

/**
 * ChatService — public API consumed by controllers.
 */
const ChatService = {
  /**
   * Generate an AI response for the given user message.
   * @param {string} message - The trimmed, validated user message
   * @returns {Promise<string>} The response text
   */
  async generateAIResponse(message) {
    return provider.generateResponse(message);
  },
};

export default ChatService;
