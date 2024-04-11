// models/Question.js
const mongoose = require('../database/index');
const { Schema } = require('../database/index');

const optionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const usersCompleteSchema = new mongoose.Schema({
    aluno: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    nota: {
        type: Number,
        required: true
    }
});


const tarefaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    turma: {
        type: Schema.Types.ObjectId,
        ref: 'Turma',
        require: false,
    },
    materia: {
        type: Schema.Types.ObjectId,
        ref: 'Materia',
        require: true,
    },
    options: {
        type: [optionSchema], // Agora referenciando o schema das opções
        required: true,
        validate: [arrayLimit, '{PATH} must be between 2 and 4']
    },
    correctAnswer: {
        type: String,
        required: true
    },
    dataFinal: {
        type: Date,
        required: true
    },
    usersConcluidos: {
        type: [usersCompleteSchema],
        required: true
    }
}, {
    timestamps: true
});

function arrayLimit(val) {
    return val.length >= 2 && val.length <= 4;
}

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;
