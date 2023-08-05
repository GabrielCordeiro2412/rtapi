const mongoose = require('../database/index')

const userPlanoSchema = new mongoose.Schema({
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

const UserPlano = mongoose.model('UserPlano', userPlanoSchema);

module.exports = UserPlano;