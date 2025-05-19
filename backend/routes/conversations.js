const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/conversations
router.get("/", async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      include: {
        participants: true,
        messages: {
          orderBy: { createdAt: "asc" },
          include: { sender: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Prisma error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch conversations", details: error.message });
  }
});

module.exports = router;
