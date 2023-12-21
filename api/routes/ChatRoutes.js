const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');

router.post('/', ChatController.createChat)
    .get('/:userId', ChatController.userChats)
    .get('/find/:firstId/:secondId', ChatController.findChat)

module.exports = router;
