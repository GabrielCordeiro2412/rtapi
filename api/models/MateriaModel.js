const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const materiaSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    instituicao:{
        type: Schema.Types.ObjectId,
        ref: 'Instituicao',
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Materia = mongoose.model('Materia', materiaSchema);

module.exports = Materia;