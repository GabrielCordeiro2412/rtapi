const { Router } = require('express');
const RewardsController = require('../controllers/RewardsController');

const router = Router();

router.post('/recompensa', RewardsController.criarRecompensa)
    .get('/recompensa', RewardsController.listarTodasRecompensas)
    .get('/recompensa/:recompensaId', RewardsController.obterRecompensaPorId)
    .put('/recompensa/:recompensaId', RewardsController.atualizarRecompensa)
    .delete('/recompensa/:recompensaId', RewardsController.deletarRecompensa)

module.exports = router;
