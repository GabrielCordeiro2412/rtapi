const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router.post('/turma', TurmaController.criarTurma)
    .get('/turma', TurmaController.listarTodasTurmas)
    .get('/turma/:turmaId', TurmaController.obterTurmaPorId)
    .put('/turma/:turmaId', TurmaController.atualizarTurma)
    .delete('/turma/:turmaId', TurmaController.deletarTurma)
    .post('/turma/usuario', TurmaController.buscarUsuariosPorTurma)

module.exports = router;
