const TurmaMateria = require('../models/TurmaMateriaModel');
const User = require('../models/UserModel');

class TurmaMateriaController {
    // Cria uma nova relação entre turma e matéria
    static async criarTurmaMateria(req, res) {
        const { turmaid, materiaid, diaSemana } = req.headers;

        try {
            const novaTurmaMateria = await TurmaMateria.create({
                turma: turmaid,
                materia: materiaid,
                diaSemana
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

        try {
            const turmaMateria = await TurmaMateria.findById(turmaMateriaId);

            if (!turmaMateria) {
                return res.status(404).json({ error: 'Relação entre turma e matéria não encontrada' });
            }

            const updates = {};
            if (turmaid) updates.turma = turmaid;
            if (materiaid) updates.materia = materiaid;

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
            const turmaMateria = await TurmaMateria.find({ turma: turmaId });

            return res.status(200).json(turmaMateria);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar TurmaMateria por turma' });
        }
    }
}

module.exports = TurmaMateriaController;
