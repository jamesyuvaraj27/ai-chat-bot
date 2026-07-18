import { MAX_MESSAGE_LENGTH, HTTP_STATUS } from '../constants/index.js';

/**
 * Validate the chat request body.
 * Trims the message, rejects empty or too-long messages.
 */
const validateChatMessage = (req, res, next) => {
  const { message } = req.body;

  if (message === undefined || message === null) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Message is required.',
    });
  }

  if (typeof message !== 'string') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Message must be a string.',
    });
  }

  const trimmed = message.trim();

  if (trimmed.length === 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Message cannot be empty.',
    });
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  // Attach the trimmed message for downstream use
  req.body.message = trimmed;
  next();
};

export default validateChatMessage;
