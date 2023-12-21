const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/MessageController');

router.post('/', MessageController.addMessage)
    .get('/:chatId', MessageController.getMessages)

module.exports = router;
