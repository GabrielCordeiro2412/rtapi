const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const userRewardsSchema = new mongoose.Schema({
    rewards:{
        type: Schema.Types.ObjectId,
        ref: 'Rewards',
        require: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    used:{
        type: Boolean,
        require: true,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const UserRewards = mongoose.model('UserRewards', userRewardsSchema);

module.exports = UserRewards;