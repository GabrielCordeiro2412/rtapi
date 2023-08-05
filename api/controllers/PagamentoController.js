const Pagamento = require('../models/PagamentoModel')

const stripe = require('stripe')(process.env.SECRET_STRIPE_CODE);

class PagamentoController {
    static async criarPagamento(req, res){

    }
}

module.exports = PagamentoController