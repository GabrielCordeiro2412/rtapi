const { Router } = require('express');
const MateriaController = require('../controllers/MateriaController');

const router = Router();

router.post('/materia', MateriaController.criarMateria)
    .get('/materia', MateriaController.listarTodasMaterias)
    .get('/materia/:materiaId', MateriaController.obterMateriaPorId)
    .put('/materia/:materiaId', MateriaController.atualizarMateria)
    .delete('/materia/:materiaId', MateriaController.deletarMateria)

module.exports = router;