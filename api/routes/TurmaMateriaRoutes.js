const express = require('express');
const router = express.Router();
const TurmaMateriaController = require('../controllers/TurmaMateriaController');

router.post('/turmamateria/criar', TurmaMateriaController.criarTurmaMateria)
    .get('/turmamateria/todas', TurmaMateriaController.listarTodasTurmaMateria)
    .get('/turmamateria/:turmaMateriaId', TurmaMateriaController.obterTurmaMateriaPorId)
    .put('/turmamateria/:turmaMateriaId', TurmaMateriaController.atualizarTurmaMateria)
    .delete('/turmamateria/:turmaMateriaId', TurmaMateriaController.deletarTurmaMateria)
    .get('/turmamateria/usuarios/:turmaMateriaId', TurmaMateriaController.buscarUsuariosPorTurmaMateria)
    .get('/turmamateria/turma/:turmaId', TurmaMateriaController.buscarTurmaMateriaPorTurma)
    .get('/turmamateria/verifica/:turmaId', TurmaMateriaController.buscarTurmaMateriaPorTurmaFeedback)

module.exports = router;
