const Materia = require('../models/MateriaModel');

class MateriaController {
    static async criarMateria(req, res) {
        const { nome } = req.body;
        const { instituicaoid } = req.headers;

        try {
            const novaMateria = await Materia.create({
                nome,
                instituicao: instituicaoid,
            });

            return res.status(201).json(novaMateria);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar a matéria' });
        }
    }

    // Lista todas as matérias
    static async listarTodasMaterias(req, res) {
        try {
            const materias = await Materia.find().populate('instituicao');

            return res.status(200).json(materias);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar as matérias' });
        }
    }

    // Obtém uma matéria pelo ID
    static async obterMateriaPorId(req, res) {
        const { materiaId } = req.params;

        try {
            const materia = await Materia.findById(materiaId).populate('instituicao');

            if (!materia) {
                return res.status(404).json({ error: 'Matéria não encontrada' });
            }

            return res.status(200).json(materia);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter a matéria' });
        }
    }

    // Atualiza uma matéria pelo ID
    static async atualizarMateria(req, res) {
        const { materiaId } = req.params;
        const { nome } = req.body;

        try {
            const materia = await Materia.findByIdAndUpdate(
                materiaId,
                { nome },
                { new: true }
            ).populate('instituicao');

            if (!materia) {
                return res.status(404).json({ error: 'Matéria não encontrada' });
            }

            return res.status(200).json(materia);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar a matéria' });
        }
    }

    // Exclui uma matéria pelo ID
    static async deletarMateria(req, res) {
        const { materiaId } = req.params;

        try {
            const materia = await Materia.findByIdAndDelete(materiaId).populate('instituicao');

            if (!materia) {
                return res.status(404).json({ error: 'Matéria não encontrada' });
            }

            return res.status(200).json({ message: 'Matéria excluída com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir a matéria' });
        }
    }

}

module.exports = MateriaController