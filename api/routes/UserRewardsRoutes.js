const { Router } = require('express');
const UserRewardsController = require('../controllers/UserRewardsController');

const router = Router();

router.post('/user-rewards/criar', UserRewardsController.criarUserRewards)
    .get('/user-rewards/todos', UserRewardsController.listarTodosUserRewards)
    .get('/user-rewards/:userRewardsId', UserRewardsController.obterUserRewardsPorId)
    .get('/user-rewards/user/:userid', UserRewardsController.obterUserRewardsPorUsuario)
    .put('/user-rewards/:userRewardsId', UserRewardsController.atualizarUserRewards)
    .delete('/user-rewards/:userRewardsId', UserRewardsController.deletarUserRewards)
    .get('/user-rewards/codigo/:codigo', UserRewardsController.obterUserRewardsPorCodigo);

module.exports = router;
