const mongoose = require('../database/index');
const { Schema } = require('../database/index');

const CategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    img_url:{
        type: String,
        required: false
    },
    img_name:{
        type: String,
        required: false
    },
}, {
    timestamps: true
})

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;