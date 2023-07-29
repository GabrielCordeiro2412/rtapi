const mongoose = require('../database/index')
const { Schema } = require('../database/index');
const crypto = require('crypto')

const rewardsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    points: {
        type: Number,
        require: true
    },
    code: {
        type: String,
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

// Pré-salvamento: gera o código de 6 dígitos no formato "xxx-xxx" antes de salvar o documento
rewardsSchema.pre('save', function (next) {
    if (!this.code) {
        // Gera um valor randômico em hexadecimal
        const randomHex = crypto.randomBytes(3).toString('hex');
        // Formata o valor randômico no formato "xxx-xxx"
        this.code = `${randomHex.substr(0, 3)}-${randomHex.substr(3)}`;
    }
    next();
});

const Rewards = mongoose.model('Rewards', rewardsSchema);

module.exports = Rewards;