// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');      
const routes = require('./routes');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join('./views/pages'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Usando as rotas definidas
app.use('/api', routes);
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});