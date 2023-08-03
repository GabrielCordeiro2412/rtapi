const { Router } = require('express')
const PlanoController = require('../controllers/PlanoController')

const router = Router()

router.post('/plano', PlanoController.criarPlano)
    .get('/plano', PlanoController.listarTodosPlanos)
    .get('/plano/:planoId', PlanoController.obterPlanoPorId)
    .put('/plano/:planoId', PlanoController.atualizarPlano)
    .delete('/plano/:planoId', PlanoController.deletarPlano)

module.exports = router