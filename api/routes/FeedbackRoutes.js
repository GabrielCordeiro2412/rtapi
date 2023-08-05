const express = require('express');
const router = express.Router();

const FeedbackController = require('../controllers/FeedbackController');

router.post('/feedbacks/criar', FeedbackController.criarFeedback)
    .get('/feedbacks/:feedbackId', FeedbackController.obterFeedbackPorId)
    .get('/feedbacks', FeedbackController.listarTodosFeedbacks)
    .put('/feedbacks/:feedbackId', FeedbackController.atualizarFeedback)
    .delete('/feedbacks/:feedbackId', FeedbackController.deletarFeedback)
    .get('/feedbacks/verifica', FeedbackController.verificaFeedback)

module.exports = router;
