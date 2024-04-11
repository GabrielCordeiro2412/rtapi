const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const CategoriaLocalSchema = new mongoose.Schema({
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true,
    },
    local: {
        type: Schema.Types.ObjectId,
        ref: 'Local',
        require: true,
    }
}, {
    timestamps: true
})

const CategoriaLocal = mongoose.model('CategoriaLocal', CategoriaLocalSchema);

module.exports = CategoriaLocal;