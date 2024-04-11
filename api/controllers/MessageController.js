// chatController.js
const Message = require('../models/MessageModel')
const User = require('../models/UserModel')

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
        const { senderid, receiverid } = req.params;
        console.log(req.params)

        try {
            // Busca todas as mensagens entre os dois usuários
            const result = await Message.find({
                $or: [
                    { senderId: senderid, receiverId: receiverid },
                    { senderId: receiverid, receiverId: senderid },
                ],
            }).sort({ timestamp: 1 }); // Ordene as mensagens por timestamp, se necessário

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getPendingMessages(req, res) {
        const { receiverId } = req.params;
        return Message.find({ receiverId, read: false });
    }

    static async markMessagesAsRead(req, res) {
        const { receiverid, senderid } = req.headers;
        try {
            const results = await Message.find({senderId: senderid, receiverId: receiverid, read: false})
            if(results){
                await Message.updateMany({ senderId: senderid, receiverId: receiverid, read: false }, { read: true });

                res.status(200).json("Lido");
            }
        } catch (error) {
            console.log(error)
        }

    }

    static async uniqueChatPartners(req, res) {
        const { sender } = req.params;

        try {
            // Use o método distinct para obter destinatários únicos
            const uniquePartners = await Message.distinct('receiver', { senderId: sender });

            res.status(200).json(uniquePartners);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteAllMessages(req, res) {
        try {
            await Message.deleteMany({});
            res.status(200).json({ message: "Registros Deletados com sucesso!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async allMessages(req, res) {
        try {
            const users = await Message.find();
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getChatUsers(req, res) {
        const { userid } = req.params;

        try {
            // Use o método distinct para obter todos os usuários (receptores ou remetentes) com quem o usuário interagiu
            const uniqueSenders = await Message.distinct('senderId', { receiverId: userid });
            const uniqueReceivers = await Message.distinct('receiverId', { senderId: userid });

            // Combine os resultados para obter uma lista única de usuários
            const allUniqueUsers = [...new Set([...uniqueSenders, ...uniqueReceivers])];

            // Busque os detalhes completos dos usuários
            const chatUsers = await User.find({ _id: { $in: allUniqueUsers } }).populate("turma instituicao").sort({ name: 1 });

            // Crie um objeto para armazenar as últimas mensagens
            const lastMessages = {};

            // Para cada usuário, encontre a última mensagem trocada (como remetente ou destinatário)
            for (const user of chatUsers) {
                const lastMessage = await Message.findOne({
                    $or: [
                        { senderId: userid, receiverId: user._id },
                        { senderId: user._id, receiverId: userid },
                    ],
                })
                .sort({ createdAt: -1 }); // Alterado para `createdAt` para corresponder ao nome do campo no modelo

                lastMessages[user._id] = lastMessage;
            }

            // Adicione as últimas mensagens aos detalhes do usuário
            const usersWithLastMessages = chatUsers.map(user => ({
                ...user.toObject(),
                lastMessage: lastMessages[user._id],
            }));

            res.status(200).json(usersWithLastMessages);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteMessage(req, res){
        const {messageid} = req.params;
        try {
            await Message.findByIdAndDelete(messageid);

            res.status(200).json({ message: 'Mensagem deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar mensagem!' })
        }
    }
}

module.exports = MessageController;
