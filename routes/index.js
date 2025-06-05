// routes/index.js
const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');
const LocalizacaoController = require('../controllers/LocalizacaoController');
const UserController = require('../controllers/UserController');
const ReservaController = require('../controllers/ReservaController');
const PrecoController = require('../controllers/PrecoController');

// Rotas para o CRUD de salas
router.post('/salas', SalaController.criarSala);
router.get('/salas', SalaController.listarSalas);
router.put('/salas/:idsala', SalaController.editarSala);
router.delete('/salas/:idsala', SalaController.excluirSala);

// Rotas para o CRUD de localizacoes
router.post('/localizacoes', LocalizacaoController.criarLocalizacao);
router.get('/localizacoes', LocalizacaoController.listarLocalizacoes);
router.put('/localizacoes/:idlocalizacao', LocalizacaoController.editarLocalizacoes);
router.delete('/localizacoes/:idlocalizacao', LocalizacaoController.excluirLocalizacao);

// Rotas para o CRUD de users
router.post('/users', UserController.criarUsers);
router.get('/users', UserController.listarUsers);
router.put('/users/:iduser', UserController.editarUser);
router.delete('/users/:iduser', UserController.excluirUser);

// Rotas para o CRUD de reservas
router.post('/reservas', ReservaController.criarReserva);
router.get('/reservas', ReservaController.listarReservas);
router.put('/reservas/:idreserva', ReservaController.editarReserva);
router.delete('/reservas/:idreserva', ReservaController.excluirReserva);

// Rotas para o CRUD de precos
router.post('/precos', PrecoController.criarPreco);
router.get('/precos', PrecoController.listarPrecos);
router.put('/precos/:idpreco', PrecoController.editarPreco);
router.delete('/precos/:idpreco', PrecoController.excluirPreco);

router.get('/', (req, res) => {
  res.render('homepage'); // Renderiza homepage.ejs
});

router.get('/salaspage', (req, res) => {
  res.render('salaspage', {
    salas: [], // sem resultados por enquanto
    filters: {} // filtros vazios
  });
});

module.exports = router;