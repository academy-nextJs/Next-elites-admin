const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/messages
router.post('/', async (req, res) => {
  const { content, senderId, conversationId } = req.body;

  // Validate input
  if (!content || !senderId || !conversationId) {
    return res.status(400).json({ error: 'Missing required fields: content, senderId, conversationId' });
  }

  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId,
      },
      include: {
        sender: true,
      },
    });
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message', details: error.message });
  }
});

module.exports = router;