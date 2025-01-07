const Message = require('../models/message');
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');

const messageController = {
  
  sendMessage: asyncHandler(async (req, res) => {
    const { recipient, content } = req.body;

    if (!recipient || !content) {
      throw new CustomError('Faltan campos requeridos (destinatario o contenido)', 400);
    }

    const message = await Message.create({
      sender: req.user.id,
      recipient,
      content,
    });

    res.status(201).json({ success: true, data: message });
  }),

  
  getChatMessages: asyncHandler(async (req, res) => {
    const { recipientId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: recipientId },
        { sender: recipientId, recipient: req.user.id },
      ],
    }).sort({ createdAt: 1 }); 

    res.status(200).json({ success: true, data: messages });
  }),

  
  getConversations: asyncHandler(async (req, res) => {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: req.user.id }, { recipient: req.user.id }],
        },
      },
      {
        $group: {
          _id: { $cond: [{ $eq: ['$sender', req.user.id] }, '$recipient', '$sender'] },
          lastMessage: { $last: '$$ROOT' },
        },
      },
      { $sort: { 'lastMessage.createdAt': -1 } }, 
    ]);

    res.status(200).json({ success: true, data: conversations });
  }),
};

module.exports = messageController;
