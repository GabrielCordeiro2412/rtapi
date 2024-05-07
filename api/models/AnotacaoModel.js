const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const AnotacaoSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    dataLimite: {
        type: Date,
        require: false
    }
}, {
    timestamps: true
})

const Anotacao = mongoose.model('Anotacao', AnotacaoSchema);

module.exports = Anotacao;