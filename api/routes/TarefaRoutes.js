const { Router } = require('express');
const TarefaController = require('../controllers/TarefaController');

const router = Router();

router.post('/tarefa', TarefaController.createTarefa)
    .get('/tarefa', TarefaController.getTarefas)
    .get('/tarefa/:id', TarefaController.getTarefaById)
    .put('/tarefa/:id', TarefaController.updateTarefa)
    .delete('/tarefa/:id', TarefaController.deleteTarefa)
    .put('/tarefa/concluido/:id', TarefaController.updateUserComplete)

module.exports = router;
