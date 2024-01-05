const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        require: true
    },
    receiverId: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    read: { type: Boolean, default: false },
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;