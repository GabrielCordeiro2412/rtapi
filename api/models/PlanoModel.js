const mongoose = require('../database/index')

const planoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    valor:{
        type: Number,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Plano = mongoose.model('Plano', planoSchema);

module.exports = Plano;