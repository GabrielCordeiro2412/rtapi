const Feedback = require('../models/FeedbackModel');
const User = require('../models/UserModel');

class FeedbackController {
    // Cria um novo feedback
    static async criarFeedback(req, res) {
        const { perguntasRespostas, consideracoesFinais, nota } = req.body;
        const { alunoid, turmaMateriaid } = req.headers;

        try {
            const novoFeedback = await Feedback.create({
                turmaMateria: turmaMateriaid,
                aluno: alunoid,
                perguntasRespostas,
                consideracoesFinais,
                nota,
            });

            // Adiciona 10 pontos ao usuário
            const usuario = await User.findById(alunoid);
            if (usuario) {
                usuario.points += 10;
                await usuario.save();
            }

            return res.status(201).json(novoFeedback);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar o feedback' });
        }
    }

    static async obterFeedbackPorId(req, res) {
        const { feedbackId } = req.params;

        try {
            const feedback = await Feedback.findById(feedbackId);

            if (!feedback) {
                return res.status(404).json({ error: 'Feedback não encontrado' });
            }

            return res.status(200).json(feedback);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter o feedback' });
        }
    }

    static async listarTodosFeedbacks(req, res) {
        try {
            const feedbacks = await Feedback.find();

            return res.status(200).json(feedbacks);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao listar os feedbacks' });
        }
    }

    static async atualizarFeedback(req, res) {
        const { feedbackId } = req.params;
        const { turmaMateria, respostas, comentario, nota } = req.body;

        try {
            const feedback = await Feedback.findById(feedbackId);

            if (!feedback) {
                return res.status(404).json({ error: 'Feedback não encontrado' });
            }

            // Verifica se a turmaMateria existe
            const turmaMateriaExists = await TurmaMateria.findById(turmaMateria);
            if (!turmaMateriaExists) {
                return res.status(400).json({ error: 'TurmaMateria não encontrada' });
            }

            // Verifica se todas as perguntas foram respondidas
            if (turmaMateriaExists.perguntas.length !== respostas.length) {
                return res.status(400).json({ error: 'Responda todas as perguntas' });
            }

            feedback.turmaMateria = turmaMateria;
            feedback.respostas = respostas;
            feedback.comentario = comentario;
            feedback.nota = nota;

            await feedback.save();

            return res.status(200).json(feedback);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o feedback' });
        }
    }

    static async deletarFeedback(req, res) {
        const { feedbackId } = req.params;

        try {
            const feedback = await Feedback.findByIdAndDelete(feedbackId);

            if (!feedback) {
                return res.status(404).json({ error: 'Feedback não encontrado' });
            }

            return res.status(200).json({ message: 'Feedback excluído com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o feedback' });
        }
    }
}

module.exports = FeedbackController;
