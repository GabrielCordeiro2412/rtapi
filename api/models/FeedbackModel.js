const mongoose = require('../database/index')
const { Schema } = require('../database/index');


const respostaSchema = new Schema({
    pergunta: {
        type: String,
        required: true,
    },
    resposta: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
});

// Defina o Schema para as considerações finais do feedback
const consideracoesFinaisSchema = new Schema({
    frase: {
        type: String,
        required: true,
    },
    nota: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
});

const feedbackSchema = new mongoose.Schema({
    instituicao: {
        type: Schema.Types.ObjectId,
        ref: 'Instituicao',
        required: true,
    },
    turma: {
        type: Schema.Types.ObjectId,
        ref: 'Turma',
        required: true,
    },
    materia: {
        type: Schema.Types.ObjectId,
        ref: 'Materia',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    respostas: [respostaSchema], // Array de respostas
    consideracoesFinais: consideracoesFinaisSchema, // Considerações finais
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;