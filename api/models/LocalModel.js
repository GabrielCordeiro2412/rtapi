const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const localSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    endereco: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    latitude: {
        type: String,
        require: true
    },
    longitude: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Local = mongoose.model('Local', localSchema);

module.exports = Local;