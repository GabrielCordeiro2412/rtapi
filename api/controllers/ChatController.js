// chatController.js
const socketIO = require('socket.io');
const Message = require('../models/MessageModel');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

let io;
const connectedUsers = {}; // Mapeia o socket.id para o ID do usuário

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

            // Enviar a nova mensagem para os clientes conectados
            io.emit('newMessage', newMessage);

            res.json(newMessage);
        } catch (error) {
            console.error('Erro ao enviar mensagem privada:', error);
            res.status(500).send('Erro interno do servidor');
        }

    }

}

function initializeSocket(server) {
    io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('Usuário conectado:', socket.id);

        socket.on('setUser', async (userId) => {
            try {
                // Verifica se o usuário existe antes de associar o ID do usuário ao ID do socket
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('Usuário não encontrado');
                }

                // Associa o ID do usuário ao ID do socket
                connectedUsers[socket.id] = userId;
                console.log(`Usuário ${userId} associado ao socket ${socket.id}`);

                // Envia as mensagens existentes para o usuário recém-conectado
                sendChatHistory(socket, userId);
            } catch (error) {
                console.error('Erro ao associar usuário ao socket:', error);
                socket.disconnect();
            }
        });

        socket.on('sendMessage', async (data) => {
            const { to, text } = data;

            try {
                // Verifica se o usuário de destino existe
                const recipientUser = await User.findById(to);
                if (!recipientUser) {
                    throw new Error('Usuário de destino não encontrado');
                }

                // Salva a mensagem no banco de dados
                const message = new Message({
                    from: connectedUsers[socket.id],
                    to,
                    text,
                });
                await message.save();

                // Envia a mensagem para o destinatário e para o remetente
                const recipientSocket = findSocketByUserId(to);
                if (recipientSocket) {
                    io.to(recipientSocket.id).emit('message', { from: connectedUsers[socket.id], text });
                }
                socket.emit('message', { from: connectedUsers[socket.id], text });
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Usuário desconectado:', socket.id);
            // Remove o mapeamento quando o usuário se desconecta
            delete connectedUsers[socket.id];
        });
    });
}

function sendChatHistory(socket, userId) {
    // Recupera as últimas mensagens do banco de dados para o usuário específico
    Message.find({
        $or: [
            { from: userId },
            { to: userId },
        ],
    })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec((err, messages) => {
            if (err) {
                console.error('Erro ao obter o histórico de bate-papo:', err);
                return;
            }

            // Emite as mensagens para o usuário recém-conectado
            socket.emit('chatHistory', messages.reverse());
        });
}

function findSocketByUserId(userId) {
    // Encontra o socket correspondente ao ID do usuário
    const socketIds = Object.keys(connectedUsers);
    for (const socketId of socketIds) {
        if (connectedUsers[socketId] === userId) {
            return io.sockets.sockets[socketId];
        }
    }
    return null;
}

function getIO() {
    if (!io) {
        throw new Error('Socket.IO not initialized!');
    }
    return io;
}

module.exports = {
    initializeSocket,
    getIO,
    ChatController
};
