const Feedback = require('../models/FeedbackModel');
const User = require('../models/UserModel');
const TurmaMateria = require('../models/TurmaMateriaModel')

class FeedbackController {
    // Cria um novo feedback
    static async criarFeedback(req, res) {
        const { perguntasRespostas, consideracoesFinais, concluded } = req.body;
        const { alunoid, turmamateriaid } = req.headers;
        console.log(req.body)

        try {

            const dataAtual = new Date();
            dataAtual.setHours(0, 0, 0, 0);

            const novoFeedback = await Feedback.create({
                turmaMateria: turmamateriaid,
                aluno: alunoid,
                perguntasRespostas,
                consideracoesFinais,
                concluded,
                createAt: dataAtual
            });

            // Adiciona 10 pontos ao usuário
            const usuario = await User.findById(alunoid);
            if (usuario) {
                usuario.spoints += 10;
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
            const aluno = await User.findById(feedback.aluno)

            if (aluno) {
                aluno.spoints -= 10;
                await aluno.save();
            }

            if (!feedback) {
                return res.status(404).json({ error: 'Feedback não encontrado' });
            }

            return res.status(200).json({ message: 'Feedback excluído com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o feedback' });
        }
    }

    static async verificaFeedback(req, res) {
        const { turmaMateriaid, alunoid } = req.headers;
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0); // Definir a hora para 00:00:00 do dia atual

        try {
            // Verificar se há um feedback para a TurmaMateria com o aluno e data atual
            const feedbackExistente = await Feedback.findOne({
                turmaMateria: turmaMateriaid,
                aluno: alunoid,
                createAt: { $gte: dataAtual }, // Filtrar feedbacks criados a partir da data atual
            });

            if (feedbackExistente) {
                // Se houver um feedback criado hoje, retornar true
                return res.status(200).send(feedbackExistente);
            } else {
                // Se não houver um feedback criado hoje, retornar false
                return res.status(404).json({ Mensagem: 'Nenhum feedback deste aluno para esta matéria hoje' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao validar o feedback' });
        }
    }

    static async deleteAllFeedbacks(req, res){
        try {
            await Feedback.deleteMany({})
            res.status(200).send({message: 'Feedbacks deletados com sucesso!'})
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir feedback' });

        }
    }
}

module.exports = FeedbackController;
