import express from 'express';
import {chat,loadChat,abortChat} from '../controllers/chatController.js';

const router = express.Router();
router.post('/', chat);
router.post('/loadchat', loadChat);
router.post('/abort', abortChat);

export default router;
