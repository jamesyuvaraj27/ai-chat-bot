import { Router } from 'express';
import { sendMessage } from '../controllers/chatController.js';
import validateChatMessage from '../validators/chatValidator.js';

const router = Router();

router.post('/chat', validateChatMessage, sendMessage);

export default router;
