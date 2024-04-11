const { Router } = require('express')
const LocalController = require('../controllers/LocalController')


const router = Router()
router
    .post('/local', LocalController.criarLocal)
    .get('/local', LocalController.buscarLocais)
    .delete('/local/:localid', LocalController.deleteLocal)
module.exports = router