const mongoose = require('../database/index')
const { Schema } = require('../database/index');
const crypto = require('crypto')

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
    code: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

// Pré-salvamento: gera o código de 6 dígitos no formato "xxx-xxx" antes de salvar o documento
userRewardsSchema.pre('save', function (next) {
    if (!this.code) {
        // Gera um valor randômico em hexadecimal
        const randomHex = crypto.randomBytes(3).toString('hex');
        // Formata o valor randômico no formato "xxx-xxx"
        this.code = `${randomHex.substr(0, 3)}-${randomHex.substr(3)}`;
    }
    next();
});


const UserRewards = mongoose.model('UserRewards', userRewardsSchema);

module.exports = UserRewards;