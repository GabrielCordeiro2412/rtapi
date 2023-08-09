const Turma = require('../models/TurmaModel');
const User = require('../models/UserModel')

class TurmaController {
    // Cria uma nova turma
    static async criarTurma(req, res) {
        const { nome } = req.body;
        const { instituicaoid } = req.headers;

        try {
            const novaTurma = await Turma.create({
                nome,
                instituicao: instituicaoid,
            });

            return res.status(201).json(novaTurma);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar a turma' });
        }
    }

    // Lista todas as turmas
    static async listarTodasTurmas(req, res) {
        try {
            const turmas = await Turma.find().populate('instituicao');

            return res.status(200).json(turmas);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar as turmas' });
        }
    }

    // Obtém uma turma pelo ID
    static async obterTurmaPorId(req, res) {
        const { turmaId } = req.params;

        try {
            const turma = await Turma.findById(turmaId).populate('instituicao');

            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter a turma' });
        }
    }

    // Atualiza uma turma pelo ID
    static async atualizarTurma(req, res) {
        const { turmaId } = req.params;
        const { nome } = req.body;

        try {
            const turma = await Turma.findByIdAndUpdate(
                turmaId,
                { nome },
                { new: true }
            ).populate('instituicao');

            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar a turma' });
        }
    }

    // Exclui uma turma pelo ID
    static async deletarTurma(req, res) {
        const { turmaId } = req.params;

        try {
            const turma = await Turma.findByIdAndDelete(turmaId).populate('instituicao');

            if (!turma) {
                return res.status(404).json({ error: 'Turma não encontrada' });
            }

            return res.status(200).json({ message: 'Turma excluída com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir a turma' });
        }
    }

    static async buscarUsuariosPorTurma(req, res) {
        const { nometurma } = req.body;
        const { turmaid } = req.headers;

        try {
            let usuarios;

            if (turmaid) {
                // Busca pelo ID da turma
                usuarios = await User.find({ turma: turmaid }).populate('turma');
            } else if (nometurma) {
                // Busca pelo trecho do nome da turma (case insensitive)
                const turmasEncontradas = await Turma.find({
                    nome: { $regex: new RegExp(nometurma, 'i') },
                });

                const turmaIds = turmasEncontradas.map((turma) => turma._id);
                usuarios = await User.find({ turma: { $in: turmaIds } }).populate('turma');
            } else {
                return res.status(400).json({ error: 'É necessário fornecer o ID da turma ou o trecho do nome da turma' });
            }

            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar os usuários da turma' });
        }
    }

    static async buscarTurmasPorInstituicao(req, res) {
        const { instituicaoId } = req.params;

        try {
            const turmas = await Turma.find({ instituicao: instituicaoId });

            return res.status(200).json(turmas);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar turmas' });
        }
    }
}

module.exports = TurmaController;
