const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/MessageController');

router.post('/message', MessageController.addMessage)
    .get('/message/:senderid/:receiverid', MessageController.messagesUser)
    .get('/message/:sender', MessageController.uniqueChatPartners)
    .get('/messages/r/:receiver', MessageController.getPendingMessages)
    .put('/messages/:receiver', MessageController.markMessagesAsRead)
    .get('/messages/all', MessageController.allMessages)
    .delete('/messages/delete/all', MessageController.deleteAllMessages)

module.exports = router;
