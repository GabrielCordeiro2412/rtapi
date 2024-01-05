const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/MessageController');

router.post('/message', MessageController.addMessage)
    .get('/message/:sender/:receiver', MessageController.messagesUser)
    .get('/message/:sender', MessageController.uniqueChatPartners)
    .get('/messages/r/:receiver', MessageController.getPendingMessages)
    .put('/messages/:receiver', MessageController.markMessagesAsRead)

module.exports = router;
