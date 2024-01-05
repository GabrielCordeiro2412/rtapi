const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');

router.post('/chat', ChatController.createChat)
    .get('/chat/:userId', ChatController.userChats)
    .get('/chat/find/:firstId/:secondId', ChatController.findChat)
    .delete('/chat/delete', ChatController.deleteChat)

module.exports = router;
