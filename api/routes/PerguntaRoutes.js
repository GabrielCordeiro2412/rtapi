const express = require('express');
const PerguntaController = require('../controllers/PerguntaController');

const router = express.Router();

router.post('/pergunta/criar', PerguntaController.criarPergunta)
    .get('/pergunta/listar', PerguntaController.listarPerguntas)
    .put('/pergunta/atualizar/:perguntaId', PerguntaController.atualizarPergunta)
    .delete('/pergunta/excluir/:perguntaId', PerguntaController.excluirPergunta)
    .get('/pergunta/:perguntaId', PerguntaController.listarPerguntaPorId);

module.exports = router;
