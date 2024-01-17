const mongoose = require('../database/index');
const { Schema } = require('../database/index');

const ChatSchema = new mongoose.Schema({
    members: {
        type: Array
    }
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;