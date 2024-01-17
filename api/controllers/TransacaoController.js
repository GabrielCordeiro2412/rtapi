const Transacao = require('../models/TransacaoModel');
const User = require('../models/UserModel')
require('dotenv').config();


const stripe = require('stripe')('sk_test_51Mw9XNBzmAAATyiFwz37GfPX2Mw8yGNCNl1X6xjTTA5gqhkXtaT0IMzmc1m9N4KV3RsiOwl1TaIDKWshZC7lwHOI00wtU8SOot');


function reaisParaCentavos(valorEmReais) {
    valorEmReais = valorEmReais.replace(/\./g, '').replace(',', '.');
    return valorEmReais;
}

class TransacaoController {

    static async CriarTransacaoDeposito(req, res) {
        const { userid, valor } = req.headers;
        const valorSemPonto = reaisParaCentavos(parseFloat(valor).toFixed(2))
        // Use an existing Customer ID if this is a returning customer.
        try {
            const user = await User.findById(userid)
            if(!user){
                return res.status(401).json({msg: 'Usuário não encontrado'})
            }
            const customer = await stripe.customers.create();
            const ephemeralKey = await stripe.ephemeralKeys.create(
                { customer: customer.id },
                { apiVersion: '2022-11-15' }
            );
            const paymentIntent = await stripe.paymentIntents.create({
                amount: valorSemPonto,
                currency: 'brl',
                customer: customer.id,
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            res.json({
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id,
                publishableKey: 'pk_test_51Mw9XNBzmAAATyiFiVK868HPZsDW82QrkQFGTFDcar9JLQgsrpxMWyY2EcfVXE8PF49gSJykwLWwc7hbFy4XtbJu00LpBFpg0K'
            });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao transferir saldo' });

        }
    }

    static async AdicionarSaldo(req, res){
        const { userid, instid } = req.headers;
        const {valor} = req.body;
        console.log(req.headers)
        try {
            const user = await User.findById(userid)
            if(!user){
                return res.status(401).json({msg: 'Usuário não encontrado'})
            }
            user.saldo = (parseFloat(user.saldo) + parseFloat(valor)).toFixed(2);
            console.log(user.saldo)
            user.save();

            const novaTransacao = await Transacao.create({
                valor: valor,
                from: userid,
                to: null,
                instituicao: instid,
                objetivo: "Depósito"
            })

            return res.status(200).json({ message: 'Transação realizada com sucesso!', transacao: novaTransacao });

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao adicionar saldo' });
        }
    }

    static async CriarTransacaoTransferencia(req, res) {
        const { objetivo, valor } = req.body;
        const { fromid, toid, instid } = req.headers;

        try {
            const userFrom = await User.findById(fromid)
            if (!userFrom || userFrom.saldo < valor) {
                return res.status(500).json({ error: 'Erro ao transferir saldo' });
            }
            if (toid) {
                const userTo = await User.findById(toid)
                if (!userTo) {
                    return res.status(500).json({ error: 'Usuário destino não existe!' });
                }

                userFrom.saldo -= valor;;
                userTo.saldo = (parseFloat(userTo.saldo) + parseFloat(valor)).toFixed(2);

                await userFrom.save();
                await userTo.save();
            }
            const novaTransacao = await Transacao.create({
                valor: valor,
                from: fromid,
                to: toid,
                instituicao: instid,
                objetivo: objetivo
            })

            return res.status(200).json({ message: 'Transação realizada com sucesso!', novaTransacao });

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao transferir saldo' });
        }
    }

    static async BuscarTransacoesUsuario(req, res) {
        const { userId } = req.params;

        try {
            const transacoesFromIds = await Transacao.distinct('_id', { from: userId, to: { $ne: userId } });
            const transacoesToIds = await Transacao.distinct('_id', { to: userId, from: { $ne: userId } });
            const todasTransacoesIds = [...transacoesFromIds, ...transacoesToIds];

            const todasTransacoes = await Transacao.find({ _id: { $in: todasTransacoesIds } }).populate('instituicao to from').sort({ createdAt: 'desc' });

            return res.status(200).json(todasTransacoes);

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar transações do usuário' });
        }
    }

    static async BuscarSaldo(req, res) {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId)

            if (!user) {
                return res.status(400).json({ error: 'Usuário inexistente!' });
            }

            console.log(user)
            const saldoAtualizado = user.saldo;

            return res.status(200).json(saldoAtualizado)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar o saldo!' });
        }
    }

    static async DeletarExtrato(req, res) {
        try {
            await Transacao.deleteMany({})
            return res.status(200).json({ status: true })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar o extrato!' });
        }
    }
}

module.exports = TransacaoController;
