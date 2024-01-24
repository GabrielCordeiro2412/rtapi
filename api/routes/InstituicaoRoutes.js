const { Router } = require('express')
const InstituicaoController = require('../controllers/InstituicaoController')

const router = Router()
router
    .post('/instituicao', InstituicaoController.criarInstituicao)
    .post('/instituicao/create-intent', InstituicaoController.createIntent)
    .get('/instituicao', InstituicaoController.todasInsituicoes)
    .delete('/instituicao/:id/remover', InstituicaoController.removerInstituicao)
    .get('/instituicao/exibe/:instituicaoId', InstituicaoController.exibirInstituicao)
    .put('/instituicao/:instituicaoId', InstituicaoController.atualizarInstituicao)
    .put('/instituicao/:instituicaoId/upgrade-plano/:planoId', InstituicaoController.atualizarPlano)
    .get('/instituicao/bycod', InstituicaoController.getInstByCodigo)
    .get('/instituicao/aprovar', InstituicaoController.aprovarUsuario)
module.exports = router