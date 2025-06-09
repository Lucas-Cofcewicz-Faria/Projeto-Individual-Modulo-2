
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

// Importa o seu arquivo de rotas original (onde estão definidas outras rotas da aplicação)
const routes = require('./routes');

// Importa o controller de autenticação que contém criarConta e login
const userController = require('./controllers/UserController');

const app = express();
const port = 3000;


// Tudo que estiver dentro de "styles/" (na raiz do projeto) ficará disponível em "/styles/*"
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// Tudo que estiver dentro de "assets/" ficará disponível em "/assets/*"
app.use('/assets', express.static(path.join(__dirname, 'assets')));


// Vamos apontar para a pasta "views/pages", pois o seu login.ejs e as outras views estão lá
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'algum_segredo_super_complexo', // EM PRODUÇÃO: usar variáveis de ambiente
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      // secure: true, // só habilitar em HTTPS
    },
  })
);

//      (você deve ter o arquivo views/pages/login.ejs conforme combinamos anteriormente)
app.get('/login', (req, res) => {
  res.render('login');
});

// 5.2) POST /api/criarconta → chama userController.criarConta
app.post('/api/criarconta', userController.criarConta);

// 5.3) POST /api/login → chama userController.login
app.post('/api/login', userController.login);

// 5.4) POST /logout → destrói a sessão (opcional, desde que exista userController.logout)
app.post('/logout', (req, res) => {
  // Se você implementou logout em UserController, troque para userController.logout
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
      return res.status(500).json({ error: 'Não foi possível sair.' });
    }
    return res.json({ success: true });
  });
});


// Todas as rotas definidas em ./routes serão usadas dentro de "/api"
app.use('/api', routes);

// Todas as rotas definidas em ./routes também serão usadas dentro de "/"
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
