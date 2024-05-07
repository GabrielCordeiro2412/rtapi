const express = require('express');
const router = express.Router();

const AnotacaoController = require('../controllers/AnotacaoController');

router.post('/anotacao', AnotacaoController.saveAnotacao)
    .get('/anotacao', AnotacaoController.allAnotacoes)
    .get('/anotacao/:userid', AnotacaoController.anotacoesPorAluno)
    .delete('/anotacao/delete', AnotacaoController.deleteAnotacao)
    .put('/anotacao/edit', AnotacaoController.editAnotacao)

module.exports = router;
