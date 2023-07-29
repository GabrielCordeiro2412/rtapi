const Rewards = require('../models/RewardsModel');

class RewardsController {
    // Cria uma nova recompensa
    static async criarRecompensa(req, res) {
        const { title, points, quantity } = req.body;
        const { instituicaoid } = req.headers;

        try {
            const novaRecompensa = await Rewards.create({
                title,
                points,
                quantity,
                instituicao: instituicaoid,
            });

            return res.status(201).json(novaRecompensa);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar a recompensa' });
        }
    }

    // Lista todas as recompensas
    static async listarTodasRecompensas(req, res) {
        try {
            const recompensas = await Rewards.find().populate('instituicao');

            return res.status(200).json(recompensas);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar as recompensas' });
        }
    }

    // Obtém uma recompensa pelo ID
    static async obterRecompensaPorId(req, res) {
        const { recompensaId } = req.params;

        try {
            const recompensa = await Rewards.findById(recompensaId).populate('instituicao');

            if (!recompensa) {
                return res.status(404).json({ error: 'Recompensa não encontrada' });
            }

            return res.status(200).json(recompensa);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter a recompensa' });
        }
    }

    // Atualiza uma recompensa pelo ID
    static async atualizarRecompensa(req, res) {
        const { recompensaId } = req.params;
        const { title, points, quantity } = req.body;

        try {
            const recompensa = await Rewards.findByIdAndUpdate(
                recompensaId,
                { title, points, quantity },
                { new: true }
            ).populate('instituicao');

            if (!recompensa) {
                return res.status(404).json({ error: 'Recompensa não encontrada' });
            }

            return res.status(200).json(recompensa);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar a recompensa' });
        }
    }

    // Exclui uma recompensa pelo ID
    static async deletarRecompensa(req, res) {
        const { recompensaId } = req.params;

        try {
            const recompensa = await Rewards.findByIdAndDelete(recompensaId).populate('instituicao');

            if (!recompensa) {
                return res.status(404).json({ error: 'Recompensa não encontrada' });
            }

            return res.status(200).json({ message: 'Recompensa excluída com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir a recompensa' });
        }
    }
}

module.exports = RewardsController;
