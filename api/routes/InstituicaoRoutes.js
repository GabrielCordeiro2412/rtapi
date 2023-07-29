const { Router } = require('express')
const InstituicaoController = require('../controllers/InstituicaoController')

const router = Router()
router
    .post('/instituicao', InstituicaoController.criarInstituicao)
    .get('/instituicao', InstituicaoController.todasInsituicoes)
    .delete('/instituicao/:id/remover', InstituicaoController.removerInstituicao)
    .get('/instituicao/:instituicaoId', InstituicaoController.exibirInstituicao)
    .put('/instituicao/:instituicaoId', InstituicaoController.atualizarInstituicao)
    .put('/instituicao/:instituicaoId/upgrade-plano/:planoId', InstituicaoController.atualizarPlano);
module.exports = router