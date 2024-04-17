// chatSocket.js
module.exports = function(io) {
    let activeUsers = [];

    io.on("connection", (socket) => {
        // Adiciona novo usuário
        socket.on("new-user-add", (newUserId) => {
            if (!activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id });
                console.log("Novo Usuário Conectado", activeUsers);
            }
            io.emit("get-users", activeUsers);
        });

        socket.on("disconnect", () => {
            // Remove usuário dos usuários ativos
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            console.log("Usuário Desconectado", activeUsers);
            io.emit("get-users", activeUsers);
        });

        // Envia mensagem para um usuário específico
        socket.on("send-message", (data) => {
            try {
                const { receiverId } = data;
                const user = activeUsers.find((user) => user.userId === receiverId);

                if (user) {
                    io.to(user.socketId).emit("recieve-message", data);
                } else {
                    console.log("Usuário não encontrado para enviar a mensagem:", receiverId);
                }
            } catch (error) {
                console.error("Erro ao processar mensagem:", error);
            }
        });
    });
};
