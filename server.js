
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const routes = require('./routes');
const userController = require('./controllers/UserController');
const app = express();
const port = 3000;

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'algum_segredo_super_complexo',
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
  
    },
  })
);

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/api/criarconta', userController.criarConta);
app.post('/api/login', userController.login);

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
      return res.status(500).json({ error: 'Não foi possível sair.' });
    }
    return res.json({ success: true });
  });
});



app.use('/api', routes);
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
