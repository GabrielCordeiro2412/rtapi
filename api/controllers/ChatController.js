// chatController.js
const Message = require('../models/MessageModel');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

class ChatController {

    static async getPrivateMessages(req, res) {
        const { user, to } = req.params;

        // Adicione verificação de autenticação aqui (verifique o token)
        const token = req.headers.authorization;

        try {
            jwt.verify(token, authConfig.secret);
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        try {
            const userexists = await User.findOne({ user });

            if (!userexists) {
                return res.status(400).json({ error: 'Usuário não existe' });
            }

            const messages = await Message.find({
                $or: [
                    { user, to },
                    { user: to, to: user },
                ],
            });
            res.json(messages);
        } catch (error) {
            console.error('Erro ao obter mensagens privadas:', error);
            res.status(500).send('Erro interno do servidor');
        }
    }

    static async sendPrivateMessage(req, res) {
        const { user, text, to } = req.body;

        // Adicione verificação de autenticação aqui (verifique o token)
        const token = req.headers.authorization;

        try {
            jwt.verify(token, authConfig.secret);
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        try {

            const userexists = await User.findOne({ user });

            if (!userexists) {
                return res.status(400).json({ error: 'Usuário não existe' });
            }

            const newMessage = new Message({ user, text, to });
            await newMessage.save();

            res.json(newMessage);
        } catch (error) {
            console.error('Erro ao enviar mensagem privada:', error);
            res.status(500).send('Erro interno do servidor');
        }

    }

}

module.exports = {
    ChatController
};
