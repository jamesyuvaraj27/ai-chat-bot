import ChatService from '../services/chatService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { HTTP_STATUS } from '../constants/index.js';

/**
 * POST /api/chat
 * Receives a user message and returns the AI-generated response.
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  const response = await ChatService.generateAIResponse(message);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    response,
  });
});
