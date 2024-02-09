const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const AvatarSchema = new mongoose.Schema({
    img_url: {
        type: String,
        required: false
    },
    img_name: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})

const Avatar = mongoose.model('Avatar', AvatarSchema);

module.exports = Avatar;