const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const messageSchema = new mongoose.Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    text: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;