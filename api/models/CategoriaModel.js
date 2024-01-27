const mongoose = require('../database/index');
const { Schema } = require('../database/index');

const CategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;