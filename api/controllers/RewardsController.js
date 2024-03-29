const Rewards = require('../models/RewardsModel');

class RewardsController {
    // Cria uma nova recompensa
    static async criarRecompensa(req, res) {
        const { title, points, quantity } = req.body;
        const { instituicaoid } = req.headers;

        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            return res.status(400).json({ error: 'A quantidade deve ser um número maior que zero' });
        }

        try {
            const novaRecompensa = await Rewards.create({
                title,
                points,
                quantity: parsedQuantity,
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

    static async getRewardsPorInstituicao(req, res) {
        const { instituicaoId } = req.params;

        try {
            const rewards = await Rewards.find({ instituicao: instituicaoId });

            return res.status(200).json(rewards);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter os rewards da instituição' });
        }
    }
}

module.exports = RewardsController;
