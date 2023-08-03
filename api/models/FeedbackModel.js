const mongoose = require('../database/index');
const { Schema } = require('../database/index');

const feedbackSchema = new mongoose.Schema({
    turmaMateria: {
        type: Schema.Types.ObjectId,
        ref: 'TurmaMateria',
        require: true,
    },
    aluno: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    perguntasRespostas: [{
        pergunta: {
            type: Schema.Types.ObjectId,
            ref: 'Pergunta',
            require: true,
        },
        resposta: {
            type: Number,
            require: true,
            min: 1,
            max: 5,
        },
    }],
    consideracoesFinais: {
        comentario: {
            type: String,
            require: true,
        },
        nota: {
            type: Number,
            require: true,
            min: 1,
            max: 5,
        },
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
