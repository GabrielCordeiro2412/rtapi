const { Router } = require('express');
const TransacaoController = require('../controllers/TransacaoController');

const router = Router();

router.post('/transacao/transferir', TransacaoController.CriarTransacaoTransferencia)
    .get('/transacao/:userId', TransacaoController.BuscarTransacoesUsuario)
    .get('/transacao/saldo/:userId', TransacaoController.BuscarSaldo)
    .delete('/transacao/delete/all', TransacaoController.DeletarExtrato)
    .post('/transacao/intent', TransacaoController.CriarTransacaoDeposito)
    .put('/transacao/deposito', TransacaoController.AdicionarSaldo)

module.exports = router;
