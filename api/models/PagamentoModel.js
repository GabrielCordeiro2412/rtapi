const mongoose = require('../database/index')

const pagamentoSchema = new mongoose.Schema({
    clientSecret: {
        type: String,
        require: true,
    },
    valor:{
        type: Number,
        require: true,
    },
    descricao:{
        type: String,
        require: true,
    },
    model:{
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Pagamento = mongoose.model('Pagamento', pagamentoSchema);

module.exports = Pagamento;