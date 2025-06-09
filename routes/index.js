// routes/index.js
const express                  = require('express');
const router                   = express.Router();
const SalaController           = require('../controllers/SalaController');
const LocalizacaoController    = require('../controllers/LocalizacaoController');
const UserController           = require('../controllers/UserController');
const ReservaController        = require('../controllers/ReservaController');
const PrecoController          = require('../controllers/PrecoController');

// CRUD de Salas (JSON)
router.post   ('/salas',              SalaController.criarSala);
router.get    ('/salas',              SalaController.listarSalas);
router.put    ('/salas/:idsala',      SalaController.editarSala);
router.delete ('/salas/:idsala',      SalaController.excluirSala);

// Buscar salas com filtros (JSON e EJS)
router.get    ('/api/salas',          SalaController.buscarComFiltrosJSON);
router.get    ('/salaspage',          SalaController.buscarComFiltrosEJS);

// CRUD de Localização
router.post   ('/localizacoes',                 LocalizacaoController.criarLocalizacao);
router.get    ('/localizacoes',                 LocalizacaoController.listarLocalizacoes);
router.put    ('/localizacoes/:idlocalizacao',  LocalizacaoController.editarLocalizacoes);
router.delete ('/localizacoes/:idlocalizacao',  LocalizacaoController.excluirLocalizacao);

// CRUD de Users (alinhado aos nomes dos exports)
router.post   ('/users',             UserController.criarUsers);
router.get    ('/users',             UserController.listarUsers);  // <<-- corrigido
router.put    ('/users/:iduser',     UserController.editarUser);   // <<-- corrigido
router.delete ('/users/:iduser',     UserController.excluirUser);  // <<-- corrigido

// CRUD de Reservas
router.post   ('/reservas',          ReservaController.criarReserva);
router.get    ('/reservas',          ReservaController.listarReservas);
router.put    ('/reservas/:idreserva', ReservaController.editarReserva);
router.delete ('/reservas/:idreserva', ReservaController.excluirReserva);

// CRUD de Preços
router.post   ('/precos',            PrecoController.criarPreco);
router.get    ('/precos',            PrecoController.listarPrecos);
router.put    ('/precos/:idpreco',   PrecoController.editarPreco);
router.delete ('/precos/:idpreco',   PrecoController.excluirPreco);

// Autenticação
router.post   ('/criarconta',        UserController.criarConta);
router.post   ('/login',             UserController.login);

// Views principais
router.get    ('/',                  (req, res) => res.render('homepage'));
router.get    ('/login',             (req, res) => res.render('login'));
router.get('/minhas-reservas', ReservaController.dashboard);

module.exports = router;
