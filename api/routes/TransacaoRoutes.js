const { Router } = require('express');
const TransacaoController = require('../controllers/TransacaoController');

const router = Router();

router.post('/transacao/transferir', TransacaoController.CriarTransacaoTransferencia)
    .get('/transacao/:userId', TransacaoController.BuscarTransacoesUsuario)
    .get('/transacao/saldo/:userId', TransacaoController.BuscarSaldo)
    .delete('/transacao/delete/all', TransacaoController.DeletarExtrato)
    .post('/transacao/deposito', TransacaoController.CriarTransacaoDeposito)

module.exports = router;
