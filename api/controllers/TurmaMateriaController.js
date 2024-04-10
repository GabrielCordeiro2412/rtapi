const TurmaMateria = require('../models/TurmaMateriaModel');
const User = require('../models/UserModel');
const Turma = require('../models/TurmaModel');
const Materia = require('../models/MateriaModel');
const Feedback = require('../models/FeedbackModel');

class TurmaMateriaController {
    // Cria uma nova relação entre turma e matéria
    static async criarTurmaMateria(req, res) {
        const { turmaid, materiaid } = req.headers;
        const { diaSemana, horario } = req.body;

        try {
            const turma = await Turma.findById(turmaid);
            const materia = await Materia.findById(materiaid);
            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            } else if (!materia) {
                return res.status(404).json({ error: 'Materia não encontrada' });
            }
            const novaTurmaMateria = await TurmaMateria.create({
                turma: turmaid,
                materia: materiaid,
                diaSemana,
                horario
            });

            return res.status(201).json(novaTurmaMateria);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar a relação entre turma e matéria' });
        }
    }

    // Lista todas as relações entre turma e matéria
    static async listarTodasTurmaMateria(req, res) {
        try {
            const turmasMaterias = await TurmaMateria.find().populate('turma materia');

            return res.status(200).json(turmasMaterias);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar as relações entre turma e matéria' });
        }
    }

    // Obtém uma relação entre turma e matéria pelo ID
    static async obterTurmaMateriaPorId(req, res) {
        const { turmaMateriaId } = req.params;

        try {
            const turmaMateria = await TurmaMateria.findById(turmaMateriaId).populate('turma materia');

            if (!turmaMateria) {
                return res.status(404).json({ error: 'Relação entre turma e matéria não encontrada' });
            }

            return res.status(200).json(turmaMateria);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter a relação entre turma e matéria' });
        }
    }

    // Atualiza uma relação entre turma e matéria pelo ID
    static async atualizarTurmaMateria(req, res) {
        const { turmaMateriaId } = req.params;
        const { turmaid, materiaid } = req.headers;
        const { diaSemana, horario } = req.body;

        try {
            const turmaMateria = await TurmaMateria.findById(turmaMateriaId);

            if (!turmaMateria) {
                return res.status(404).json({ error: 'Relação entre turma e matéria não encontrada' });
            }

            const updates = {};
            if (turmaid) updates.turma = turmaid;
            if (materiaid) updates.materia = materiaid;
            if (diaSemana) updates.diaSemana = diaSemana;
            if (horario) updates.horario = horario;

            const turmaMateriaAtualizada = await TurmaMateria.findByIdAndUpdate(turmaMateriaId, { $set: updates }, { new: true }).populate('turma materia');

            return res.status(200).json(turmaMateriaAtualizada);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao atualizar a relação entre turma e matéria' });
        }
    }

    // Exclui uma relação entre turma e matéria pelo ID
    static async deletarTurmaMateria(req, res) {
        const { turmaMateriaId } = req.params;

        try {
            const turmaMateria = await TurmaMateria.findByIdAndDelete(turmaMateriaId).populate('turma materia');

            if (!turmaMateria) {
                return res.status(404).json({ error: 'Relação entre turma e matéria não encontrada' });
            }

            return res.status(200).json({ message: 'Relação entre turma e matéria excluída com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir a relação entre turma e matéria' });
        }
    }

    static async buscarUsuariosPorTurmaMateria(req, res) {
        const { turmaMateriaId } = req.params;

        try {
            // Verifica se a relação entre turma e matéria existe
            const turmaMateria = await TurmaMateria.findById(turmaMateriaId);
            if (!turmaMateria) {
                return res.status(404).json({ error: 'Relação entre turma e matéria não encontrada' });
            }

            // Busca os usuários que possuem a turma da relação
            const usuarios = await User.find({ turma: turmaMateria.turma });

            return res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar usuários por turma e matéria' });
        }
    }

    static async buscarTurmaMateriaPorTurma(req, res) {
        const { turmaId } = req.params;

        try {
            // Busca todas as TurmaMateria relacionadas à turma
            const turmaMateria = await TurmaMateria.find({ turma: turmaId })
            .sort({horario: 1})
            .populate('turma materia');

            return res.status(200).json(turmaMateria);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar TurmaMateria por turma' });
        }
    }

    static async buscarTurmaMateriaPorDiaSemanaTurma(req, res) {
        const { turmaId, dia} = req.params;

        try {
            // Busca todas as TurmaMateria relacionadas à turma
            const turmaMateria = await TurmaMateria.find({ turma: turmaId, diaSemana: dia })
            .sort({horario: 1})
            .populate('turma materia');

            return res.status(200).json(turmaMateria);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar TurmaMateria por turma' });
        }
    }

    static async buscarTurmaMateriaPorTurmaFeedback(req, res) {
        const { turmaId } = req.params;
        const { userid } = req.headers;

        try {
            // Busca todas as TurmaMateria relacionadas à turma
            const turmasMaterias = await TurmaMateria.find({ turma: turmaId })
            .sort({horario: 1})
            .populate('turma materia');

            // Verifica se existe um feedback do aluno para cada TurmaMateria no dia atual
            const dataAtual = new Date();
            dataAtual.setHours(0, 0, 0, 0); // Definir a hora para 00:00:00 do dia atual

            for (let i = 0; i < turmasMaterias.length; i++) {
                const turmaMateria = turmasMaterias[i];
                const turmaMateriaId = turmaMateria._id;

                // Busca o feedback do aluno para a TurmaMateria no dia atual
                const feedbackExistente = await Feedback.findOne({
                    turmaMateria: turmaMateriaId,
                    aluno: userid, // Substitua por como você obtém o ID do aluno (dependendo de como é feita a autenticação do usuário)
                    createAt: { $gte: dataAtual }, // Filtrar feedbacks criados a partir da data atual
                });

                // Adiciona a propriedade "concluido" com valor "sim" se houver um feedback criado hoje ou "não" caso contrário
                turmasMaterias[i] = {
                    ...turmaMateria.toObject(),
                    concluido: feedbackExistente ? true : false,
                };
            }

            return res.status(200).json(turmasMaterias);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar TurmaMateria por turma' });
        }
    }

    static async listarMateriasPorTurma(req, res) {
        const { turmaid } = req.params;

        try {
            // Busca todas as TurmaMateria relacionadas à turma
            const turmaMaterias = await TurmaMateria.find({ turma: turmaid }).populate('materia');

            // Extrai as matérias únicas da lista de TurmaMaterias
            const materiasUnicas = Array.from(new Set(turmaMaterias.map(turmaMateria => turmaMateria.materia)));

            return res.status(200).json(materiasUnicas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar matérias por turma' });
        }
    }
}

module.exports = TurmaMateriaController;
