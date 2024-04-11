const express = require('express');
const router = express.Router();

const AnotacaoController = require('../controllers/AnotacaoController');

router.post('/anotacao', AnotacaoController.saveAnotacao)
    .get('/anotacao', AnotacaoController.allAnotacoes)
    .get('/anotacao/:userid', AnotacaoController.anotacoesPorAluno)
    .delete('/anotacao/delete', AnotacaoController.deleteAnotacao)

module.exports = router;
