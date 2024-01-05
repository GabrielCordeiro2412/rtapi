// chatController.js
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const Chat = require('../models/ChatModel')

class ChatController {
    static async createChat(req, res) {
        //console.log(req.body.senderId, req.body.receiverId)
        const existingChat = await Chat.findOne({
            members: { $all: [req.body.senderId, req.body.receiverId] }
        });

        try {
            if (existingChat) {
                console.log("Chat já existente")
                // Se o chat já existe, retorna um erro ou outra resposta apropriada
                return res.status(400).json(existingChat);
            }

            const newChat = new Chat({
                members: [req.body.senderId, req.body.receiverId]
            })

            const result = await newChat.save();
            console.log("Chat criado com sucesso!")
            res.status(200).json(result)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async deleteChat(req, res) {
        const { senderId, receiverId } = req.body;

        try {
            await Chat.deleteOne({
                members: { $all: [senderId, receiverId] }
            });

            res.status(200).json({ message: 'Chat deleted successfully' });
        } catch (error) {
            res.status(500).json(error)
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
