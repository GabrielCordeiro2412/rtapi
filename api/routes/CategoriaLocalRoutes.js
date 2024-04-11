const express = require('express');
const router = express.Router();

const CategoriaLocalController = require('../controllers/CategoriaLocalController');

router.post('/categoria/local', CategoriaLocalController.createCategoriaLocal)
    .get('/categoria/local/all', CategoriaLocalController.todasCategoriasLocal)
    .delete('/categoria/local/delete', CategoriaLocalController.deleteCategoriaLocal)
    .get('/categoria/bylocal/:localid', CategoriaLocalController.categoriasLocal)

module.exports = router;
