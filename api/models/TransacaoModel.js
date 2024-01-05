const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const transacaoSchema = new mongoose.Schema({
    valor: {
        type: Number,
        default: 0.00
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: false,
    },
    objetivo: {
        type: String,
        require: false
    },
    instituicao: {
        type: Schema.Types.ObjectId,
        ref: 'Instituicao',
        require: true,
    }
}, {
    timestamps: true
})

const Transacao = mongoose.model('Transacao', transacaoSchema);

module.exports = Transacao;