const mongoose = require('../database/index');
const { Schema } = require('../database/index');

const FaturaSchema = new mongoose.Schema({
    instituicao: {
        type: Schema.Types.ObjectId,
        ref: 'Instituicao',
        require: true,
    },
    aluno: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    descricao: {
        type: String,
        require: true
    },
    valor: {
        type: Number,
        require: true
    },
    vencimento:{
        type: Date,
        require: true
    },
    status: {
        type: String,
        enum: ['pd', 'pa'], //pd = pentende, pa = pago, 
        default: 'pd'
    }
}, {
    timestamps: true
})

const Fatura = mongoose.model('Fatura', FaturaSchema);

module.exports = Fatura;