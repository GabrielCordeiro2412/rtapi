const express = require('express');
const router = express.Router();

const CategoriaController = require('../controllers/CategoriaController');

router.post('/categoria', CategoriaController.createCategoria)
    .get('/categoria', CategoriaController.todasCategorias)
    .delete('/categoria/:categoriaid', CategoriaController.deleteCategoria)

module.exports = router;
