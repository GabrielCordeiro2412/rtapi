// chatController.js
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const Chat = require('../models/ChatModel')

class ChatController {
    static async createChat(req, res) {
        const newChat = new Chat({
            members: [req.body.senderId, req.body.receiverId]
        })

        try {
            const result = await newChat.save();
            res.status(200).json(result)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async userChats(req, res) {
        try {
            const result = await Chat.find({
                members: { $in: [req.params.userId] }
            });
            res.status(200).json(result)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async findChat(req, res) {
        try {
            const chat = Chat.findOne({
                members: { $all: [req.params.firstId, req.params.secondId] }
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = ChatController;
