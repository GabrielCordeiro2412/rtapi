const mongoose = require('../database/index')
const { Schema } = require('../database/index');
const crypto = require('crypto');

const { enviarEmailSalvar } = require('../hooks/instituicaoHooks')

const bcrypt = require('bcryptjs');

const instituicaoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    endereco: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    sigla: {
        type: String,
        require: true
    },
    cnpj: {
        type: String,
        require: true
    },
    plano: {
        type: Schema.Types.ObjectId,
        ref: 'Plano',
        require: false,
    },
    codigo: {
        type: String,
        unique: true, // Garante que cada código seja único
        require: true,
        default: function () {
            return crypto.randomBytes(3).toString('hex');
        }
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

instituicaoSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next(); this;
})

instituicaoSchema.post('save', function (inst) {
    enviarEmailSalvar(inst);
})

const Instituicao = mongoose.model('Instituicao', instituicaoSchema);

module.exports = Instituicao;