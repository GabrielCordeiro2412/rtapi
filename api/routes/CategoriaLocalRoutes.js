const express = require('express');
const router = express.Router();

const CategoriaLocalController = require('../controllers/CategoriaLocalController');

router.post('/categoria/local', CategoriaLocalController.createCategoriaLocal)
    .get('/categoria/local', CategoriaLocalController.todasCategoriasLocal)
    .delete('/categoria/local/:catlocalid', CategoriaLocalController.deleteCategoriaLocal)

module.exports = router;
