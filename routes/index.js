// routes/index.js
const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');
const LocalizacaoController = require('../controllers/LocalizacaoController');

// Rotas para o CRUD de salas
router.post('/salas', SalaController.criarSala);
router.get('/salas', SalaController.listarSalas);
router.put('/salas/:idsala', SalaController.editarSala);
router.delete('/salas/:idsala', SalaController.excluirSala);

// Rotas para o CRUD de localizacoes
router.post('/localizacoes', LocalizacaoController.criarLocalizacao);
router.get('/localizacoes', LocalizacaoController.listarLocalizacoes);
router.put('/localizacoes/:idlocalizacao', LocalizacaoController.editarLocalizacao);
router.delete('/localizacoes/:idlocalizacao', LocalizacaoController.excluirLocalizacao);

module.exports = router;