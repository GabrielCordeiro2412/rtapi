// chatController.js
const Message = require('../models/MessageModel')

class MessageController {
    static async addMessage(req, res) {
        const { receiverId, senderId, text } = req.body;
        const message = new Message({
            receiverId,
            senderId,
            text
        })
        try {
            const result = await message.save()
            console.log('mensagem salva com sucesso')
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async messagesUser(req, res) {
        const { senderId, receiverId } = req.params;

        try {
            // Busca todas as mensagens entre os dois usuários
            const result = await Message.find({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId },
                ],
            }).sort({ timestamp: 1 }); // Ordene as mensagens por timestamp, se necessário

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getPendingMessages(req, res){
        const {receiverId} = req.params;
        return Message.find({ receiverId, read: false });
    }

    static async markMessagesAsRead(req, res){
        const {receiverId} = req.params;
        await Message.updateMany({ receiverId, read: false }, { read: true });
    }

    static async uniqueChatPartners(req, res) {
        const { sender } = req.params;

        try {
            // Use o método distinct para obter destinatários únicos
            const uniquePartners = await Message.distinct('receiver', { sender });

            res.status(200).json(uniquePartners);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = MessageController;
