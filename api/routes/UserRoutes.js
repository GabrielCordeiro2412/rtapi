const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.post('/usuario', UserController.criarUsuario)
    .get('/usuario', UserController.listarTodosUsuarios)
    .get('/usuario/:usuarioId', UserController.obterUsuarioPorId)
    .put('/usuario/:usuarioId', UserController.atualizarUsuario)
    .delete('/usuario/:usuarioId', UserController.deletarUsuario)
    .post('/login', UserController.login)
    .get('/createplan', UserController.criarPlano)

module.exports = router;
