const express = require('express');
const router = express.Router();

const AvatarController = require('../controllers/AvatarController');

router.post('/avatar', AvatarController.saveAvatar)
    .get('/avatar', AvatarController.allAvatars)
    .delete('/avatar/:avatarid', AvatarController.deleteAvatar)

module.exports = router;
