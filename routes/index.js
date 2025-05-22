// routes/index.js
const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');
const LocalizacaoController = require('../controllers/LocalizacaoController');
const UserController = require('../controllers/UserController');
const ReservaController = require('../controllers/ReservaController');

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

// Rotas para o CRUD de users
router.post('/users', UserController.criarUsers);
router.get('/users', UserController.listarUsers);
router.put('/users/:iduser', UserController.editarUsers);
router.delete('/users/:iduser', UserController.excluirUsers);

// Rotas para o CRUD de users
router.post('/reservas', ReservaController.criarReserva);
router.get('/reservas', ReservaController.listarReservas);
router.put('/reservas/:idreserva', ReservaController.editarReserva);
router.delete('/reservas/:idreserva', ReservaController.excluirReserva);


module.exports = router;