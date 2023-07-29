const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

// Rota para criar um novo usuário
router.post('/usuario', UserController.criarUsuario)
    .get('/usuario', UserController.listarTodosUsuarios)
    .get('/usuario/:usuarioId', UserController.obterUsuarioPorId)
    .put('/usuario/:usuarioId', UserController.atualizarUsuario)
    .delete('/usuario/:usuarioId', UserController.deletarUsuario)

module.exports = router;
