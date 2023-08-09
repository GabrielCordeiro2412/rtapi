const Instituicao = require('../models/InstituicaoModel')
const Plano = require('../models/PlanoModel')
const { cnpj } = require('cpf-cnpj-validator');
const stripe = require('stripe')(process.env.SECRET_STRIPE_CODE);
class InstituicaoController {

    static async createIntent(req, res) {
        const { idplano } = req.headers;
        try {

            const plano = await Plano.findById(idplano)

            if (!plano) {
                return res.status(404).json({ Mensagem: "Plano não Encontrado" })
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount: plano.valor * 100,
                currency: 'brl',
            });
            const clientSecret = paymentIntent.client_secret
            return res.send({ clientSecret })
        } catch (error) {
            return res.json(error)
        }
    }

    static async criarInstituicao(req, res) {
        const { nome, endereco, sigla, email, instCnpj } = req.body
        const { idplano } = req.headers;
        try {

            const cnpjFormatted = cnpj.format(instCnpj);

            const plano = await Plano.findById(idplano)

            if (!plano) {
                return res.status(404).json({ Mensagem: "Plano não Encontrado" })
            }

            console.log(plano)

            if (!cnpj.isValid(cnpjFormatted)) {
                return res.status(400).json({ error: 'CNPJ inválido' });
            }

            const inst = await Instituicao.create({
                nome,
                endereco,
                email,
                sigla,
                cnpj: instCnpj,
                plano: idplano,
            })

            return res.status(200).json({
                inst,
            })
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

    static async getInstByCodigo(req, res) {
        const { codigo } = req.headers;

        try {
            const instituicao = await Instituicao.findOne({ codigo });

            if (!instituicao) {
                return res.status(404).json({ error: 'Instituição não encontrada' });
            }

            return res.status(200).json(instituicao);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter a instituição' });
        }
    }
}

module.exports = InstituicaoController