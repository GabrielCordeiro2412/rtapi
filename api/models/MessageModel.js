const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        require: true
    },
    senderId: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;