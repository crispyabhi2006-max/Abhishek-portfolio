import { Router, Request, Response } from 'express';
import { Message } from '../models/Message.ts';
import { getDbStatus } from '../db.ts';

const router = Router();

// In-memory fallback message storage when MongoDB is not connected
interface MemoryMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const memoryMessages: MemoryMessage[] = [];

// Simple RFC 5322 compliant regex check for email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/messages - Submit a contact message
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your name.',
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your email address.',
      });
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address (e.g. name@example.com).',
      });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a message before sending.',
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const newMessage = new Message({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
      });

      const saved = await newMessage.save();

      return res.status(201).json({
        success: true,
        source: 'mongodb',
        message: 'Message sent successfully!',
        data: {
          id: saved._id,
          name: saved.name,
          email: saved.email,
          createdAt: saved.createdAt,
        },
      });
    }

    // In-memory store fallback
    const fallbackMessage: MemoryMessage = {
      _id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      createdAt: new Date().toISOString(),
    };
    memoryMessages.push(fallbackMessage);

    console.log(`[Contact Form] Received message from ${cleanName} (${cleanEmail})`);

    return res.status(201).json({
      success: true,
      source: 'fallback',
      message: 'Message sent successfully!',
      note: 'Saved in development memory buffer. Configure MONGO_URI for persistent database storage.',
      data: {
        id: fallbackMessage._id,
        name: fallbackMessage.name,
        email: fallbackMessage.email,
        createdAt: fallbackMessage.createdAt,
      },
    });
  } catch (error: any) {
    console.error('[API] Error handling contact message:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while sending your message. Please try again.',
    });
  }
});

// GET /api/messages - Retrieve submitted messages (for testing & verification)
router.get('/', async (req: Request, res: Response) => {
  const dbStatus = getDbStatus();

  try {
    if (dbStatus.connected) {
      const messages = await Message.find()
        .sort({ createdAt: -1 })
        .select('-__v');

      return res.status(200).json({
        success: true,
        source: 'mongodb',
        count: messages.length,
        data: messages,
      });
    }

    return res.status(200).json({
      success: true,
      source: 'fallback',
      count: memoryMessages.length,
      data: [...memoryMessages].reverse(),
    });
  } catch (error: any) {
    console.error('[API] Error fetching messages:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve messages.',
    });
  }
});

export default router;
