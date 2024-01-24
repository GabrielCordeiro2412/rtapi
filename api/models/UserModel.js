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
        unique: true,
        require: true,
    },
    parentsControl: {
        type: Boolean,
        require: true,
        default: false
    },
    spoints: {
        type: Number,
        require: true,
        default: 0
    },
    bpoints: {
        type: Number,
        require: true,
        default: 0
    },
    passwordParents: {
        type: String,
        require: false,
    },
    saldo: {
        type: Number,
        require: true,
        default: 0.00
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
    active:{
        type: Boolean,
        require: true,
        default: false
    },
    avatar:{
        type: Number,
        require: true
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
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