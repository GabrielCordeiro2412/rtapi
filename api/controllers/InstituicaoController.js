const Instituicao = require('../models/InstituicaoModel')
const Plano = require('../models/PlanoModel')

class InstituicaoController {
    static async criarInstituicao(req, res) {
        const { nome, endereco, sigla, email } = req.body
        const { idplano } = req.headers;
        try {
            const inst = await Instituicao.create({
                nome,
                endereco,
                email,
                sigla,
                plano: idplano,
            })
            return res.status(200).json(inst)
        } catch (error) {
            return res.json(error)
        }
    }

    static async todasInsituicoes(req, res) {
        console.log(req.body)
        try {
            const inst = await Instituicao.find()
            return res.status(200).json(inst)
        } catch (error) {
            return res.json(error)
        }
    }

    static async removerInstituicao(req, res) {
        const { id } = req.params;
        try {
            const inst = await Instituicao.findById(id)

            if (!inst)
                return res.status(404).json({ Mensagem: "Não Encontrado" })

            await Instituicao.findByIdAndDelete({ _id: id })
            return res.json("Instituição deleteda com sucesso!")
        } catch (error) {
            return res.json(error)
        }
    }

    static async exibirInstituicao(req, res) {
        const { instituicaoId } = req.params;

        try {
            const instituicao = await Instituicao.findById(instituicaoId).populate('plano');

            if (!instituicao) {
                return res.status(404).json({ error: 'Instituição não encontrada' });
            }

            return res.status(200).json(instituicao);
        } catch (error) {
            return res.json(error);
        }
    }

    static async atualizarInstituicao(req, res) {
        const { instituicaoId } = req.params;
        const { nome, endereco, sigla, email } = req.body;

        try {
            const instituicao = await Instituicao.findById(instituicaoId);
            if (!instituicao) {
                return res.status(404).json({ error: 'Instituição não encontrada' });
            }

            if (nome) {
                instituicao.nome = nome;
            }
            if (endereco) {
                instituicao.endereco = endereco;
            }
            if (sigla) {
                instituicao.sigla = sigla;
            }
            if (email) {
                instituicao.email = email;
            }

            const instituicaoAtualizada = await instituicao.save();

            return res.status(200).json(instituicaoAtualizada);
        } catch (error) {
            return res.json(error);
        }
    }

    static async atualizarPlano(req, res) {
        const { instituicaoId, planoId } = req.params;

        try {
            const instituicao = await Instituicao.findById(instituicaoId);
            if (!instituicao) {
                return res.status(404).json({ error: 'Instituição não encontrada' });
            }

            const novoPlano = await Plano.findById(planoId);
            if (!novoPlano) {
                return res.status(404).json({ error: 'Plano não encontrado' });
            }

            instituicao.plano = novoPlano;

            const instituicaoAtualizada = await instituicao.save();

            return res.status(200).json(instituicaoAtualizada);
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = InstituicaoController