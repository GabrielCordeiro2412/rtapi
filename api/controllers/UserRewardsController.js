const UserRewards = require('../models/UserRewardsModel')
const Rewards = require('../models/RewardsModel');
const User = require('../models/UserModel');


class UserRewardsController {
    // Cria um novo registro de UserRewards
    static async criarUserRewards(req, res) {
        const { rewardsid, userid } = req.headers;

        try {
            // Busca o registro do Reward pelo ID
            const reward = await Rewards.findById(rewardsid);
            const user = await User.findById(userid)
            if (!reward) {
                return res.status(404).json({ error: 'Reward não encontrado' });
            }

            // Verifica se ainda há disponibilidade do Reward
            if (reward.quantity <= 0) {
                return res.status(400).json({ error: 'Reward esgotado' });
            }

            if (user.spoints < reward.points) {
                return res.status(400).json({ error: 'Pontos insuficientes para adquirir o reward' });
            }

            // Cria o novo registro de UserRewards
            const newUserRewards = await UserRewards.create({
                rewards: rewardsid,
                user: userid,
            });

            // Atualiza a quantidade disponível do Reward
            reward.quantity -= 1;
            await reward.save();
            user.spoints -= reward.points;
            await user.save();

            return res.status(201).json(newUserRewards);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar o registro de UserRewards' });
        }
    }

    // Lista todos os registros de UserRewards
    static async listarTodosUserRewards(req, res) {
        try {
            const userRewards = await UserRewards.find().populate('rewards user');

            return res.status(200).json(userRewards);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar os registros de UserRewards' });
        }
    }

    // Obtém um registro de UserRewards pelo ID
    static async obterUserRewardsPorId(req, res) {
        const { userRewardsId } = req.params;

        try {
            const userRewards = await UserRewards.findById(userRewardsId).populate('rewards user');

            if (!userRewards) {
                return res.status(404).json({ error: 'Registro de UserRewards não encontrado' });
            }

            return res.status(200).json(userRewards);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter o registro de UserRewards' });
        }
    }

    // Atualiza um registro de UserRewards pelo ID
    static async atualizarUserRewards(req, res) {
        const { userRewardsId } = req.params;
        const { used } = req.body;

        try {
            const userRewards = await UserRewards.findById(userRewardsId);

            if (!userRewards) {
                return res.status(404).json({ error: 'Registro de UserRewards não encontrado' });
            }

            const updates = {};
            if (used !== undefined) updates.used = used;

            const userRewardsAtualizado = await UserRewards.findByIdAndUpdate(
                userRewardsId,
                { $set: updates },
                { new: true }
            ).populate('rewards user');

            return res.status(200).json(userRewardsAtualizado);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o registro de UserRewards' });
        }
    }

    // Exclui um registro de UserRewards pelo ID
    static async deletarUserRewards(req, res) {
        const { userRewardsId } = req.params;

        try {
            const userRewards = await UserRewards.findByIdAndDelete(userRewardsId).populate('rewards user');

            if (!userRewards) {
                return res.status(404).json({ error: 'Registro de UserRewards não encontrado' });
            }

            return res.status(200).json({ message: 'Registro de UserRewards excluído com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o registro de UserRewards' });
        }
    }

    static async obterUserRewardsPorCodigo(req, res) {
        const { codigo } = req.params;

        try {
            // Busca o registro de UserRewards pelo código
            const userReward = await UserRewards.findOne({ code: codigo });

            if (!userReward) {
                return res.status(404).json({ error: 'UserReward não encontrado', existe: false });
            }

            return res.status(200).json({ userReward, existe: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao obter o UserReward' });
        }
    }
}

module.exports = UserRewardsController;
