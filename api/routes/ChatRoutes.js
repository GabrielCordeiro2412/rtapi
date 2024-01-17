const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');

router.post('/chat', ChatController.createChat)
    .get('/chat/:userid', ChatController.userChats)
    .get('/chat/find/:firstid/:secondid', ChatController.findChat)
    .delete('/chat/delete', ChatController.deleteChat)

module.exports = router;
