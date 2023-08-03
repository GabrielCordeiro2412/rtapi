const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const rewardsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    points: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
        default: 0
    },
    instituicao:{
        type: Schema.Types.ObjectId,
        ref: 'Instituicao',
        require: false,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Rewards = mongoose.model('Rewards', rewardsSchema);

module.exports = Rewards;