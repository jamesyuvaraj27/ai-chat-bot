import OpenAI from 'openai';
import BaseProvider from './baseProvider.js';

/**
 * OpenRouterProvider — generates responses using OpenRouter API via OpenAI SDK.
 *
 * Requires OPENROUTER_API_KEY and OPENROUTER_MODEL to be set in .env.
 */
export class OpenRouterProvider extends BaseProvider {
  constructor(apiKey, model, baseUrl) {
    super('openrouter');

    if (!apiKey) {
      throw new Error(
        'OpenRouterProvider requires an API key. Set OPENROUTER_API_KEY in your .env file.'
      );
    }

    if (!model) {
      throw new Error(
        'OpenRouterProvider requires a model. Set OPENROUTER_MODEL in your .env file.'
      );
    }

    this.openai = new OpenAI({
      baseURL: baseUrl || 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'AI Echo Bot',
      },
    });

    this.model = model;
  }

  async generateResponse(message) {
    const maxRetries = 3;
    const retryDelays = [2000, 4000, 8000];
    let attempt = 0;
    const startTime = Date.now();

    while (true) {
      try {
        const response = await this.openai.chat.completions.create({
          model: this.model,
          messages: [{ role: 'user', content: message }],
        });

        const text = response.choices?.[0]?.message?.content;
        const duration = Date.now() - startTime;

        if (!text) {
          throw new Error('OpenRouter returned an empty response.');
        }

        console.log(
          `[OpenRouterProvider] SUCCESS | Provider: openrouter | Model: ${this.model} | Response Time: ${duration}ms | Retry Count: ${attempt}`
        );

        return text;
      } catch (error) {
        // Inspect error status code
        const status = error.status || error.httpStatusCode || (error.response && error.response.status);
        const duration = Date.now() - startTime;

        console.error(
          `[OpenRouterProvider] ERROR | Attempt: ${attempt + 1}/${maxRetries + 1} | Model: ${this.model} | Response Time: ${duration}ms | Status: ${status || 'Unknown'} | Error: ${error.message}`
        );

        const isRetryable = status === 429 || status === 503;

        if (isRetryable && attempt < maxRetries) {
          const delay = retryDelays[attempt];
          console.warn(`[OpenRouterProvider] Retryable status ${status} encountered. Retrying in ${delay / 1000}s...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          attempt++;
        } else {
          console.error(
            `[OpenRouterProvider] FAILED | Provider: openrouter | Model: ${this.model} | Total Duration: ${duration}ms | Retry Count: ${attempt} | Final Error: ${error.message}`
          );

          // Standardize error message for base controller usage
          if (status === 401 || status === 403) {
            throw new Error('Authentication failed. Please check your OPENROUTER_API_KEY.');
          }

          if (status === 429) {
            throw new Error('OpenRouter API rate limit exceeded. Please try again shortly.');
          }

          if (status === 503 || status === 500) {
            throw new Error('OpenRouter API is temporarily unavailable. Please try again later.');
          }

          throw new Error(
            `Failed to generate response: ${error.message || 'Unknown error'}`
          );
        }
      }
    }
  }
}

export default OpenRouterProvider;
