const mongoose = require('../database/index')
const { Schema } = require('../database/index');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        require: true,
    },
    dtNascimento:{
        type: Date,
        require: true,
    },
    parentsControl:{
        type: Boolean,
        require: true,
        default: false
    },
    spoints:{
        type: Number,
        require: true,
        default: 0
    },
    bpoints:{
        type: Number,
        require: true,
        default: 0
    },
    passwordParents:{
        type: String,
        require: false,
    },
    instituicao: {
        type: Schema.Types.ObjectId,
        ref: 'Instituicao',
        require: true,
    },
    turma: {
        type: Schema.Types.ObjectId,
        ref: 'Turma',
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next(); this;
})

const User = mongoose.model('User', userSchema);

module.exports = User;