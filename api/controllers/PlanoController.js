const Plano = require('../models/PlanoModel')

class PlanoController {
    static async criarPlano(req, res) {
        const { nome, valor } = req.body;

        try {
            const novoPlano = await Plano.create({ nome, valor });

            return res.status(201).json(novoPlano);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o plano' });
        }
    }

    static async listarTodosPlanos(req, res) {
        try {
            const planos = await Plano.find();

            return res.status(200).json(planos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar os planos' });
        }
    }

    static async obterPlanoPorId(req, res) {
        const { planoId } = req.params;

        try {
            const plano = await Plano.findById(planoId);

            if (!plano) {
                return res.status(404).json({ error: 'Plano não encontrado' });
            }

            return res.status(200).json(plano);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter o plano' });
        }
    }

    static async atualizarPlano(req, res) {
        const { planoId } = req.params;
        const { nome, valor } = req.body;

        try {
            const plano = await Plano.findByIdAndUpdate(
                planoId,
                { nome, valor },
                { new: true }
            );

            if (!plano) {
                return res.status(404).json({ error: 'Plano não encontrado' });
            }

            return res.status(200).json(plano);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o plano' });
        }
    }

    static async deletarPlano(req, res) {
        const { planoId } = req.params;

        try {
            const plano = await Plano.findByIdAndDelete(planoId);

            if (!plano) {
                return res.status(404).json({ error: 'Plano não encontrado' });
            }

            return res.status(200).json({ message: 'Plano excluído com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o plano' });
        }
    }

}

module.exports = PlanoController