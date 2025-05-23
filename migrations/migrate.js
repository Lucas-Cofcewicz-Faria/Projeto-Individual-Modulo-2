// migrations/migrate.js
const pool = require('../config/database');

async function migrate() {
  const query = `
CREATE TABLE users (
  idUser       INTEGER       PRIMARY KEY,
  nome         VARCHAR(255),
  senha        VARCHAR(255),
  email        VARCHAR(255)
);

CREATE TABLE localizacoes (
  idLocalizacao INTEGER      PRIMARY KEY,
  nomeLocal     VARCHAR(255),
  endereco      VARCHAR(255),
  andar         VARCHAR(255)
);

CREATE TABLE salas (
  idSala        INTEGER       GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  nomeSala      VARCHAR(255),
  tamanho       VARCHAR(255),
  idLocalizacao INTEGER       NOT NULL
    REFERENCES localizacoes(idLocalizacao)
);

CREATE TABLE precos (
  idPreco       INTEGER       PRIMARY KEY,
  sala_id       INTEGER       NOT NULL
    REFERENCES salas(idSala),
  diaSemana     VARCHAR(255),
  horaInicio    TIME,
  horaFim       TIME,
  preco         DECIMAL(10,2)
);

CREATE TABLE reservas (
  idReserva     INTEGER       PRIMARY KEY,
  user_id       INTEGER       NOT NULL
    REFERENCES users(idUser),
  sala_id       INTEGER       NOT NULL
    REFERENCES salas(idSala),
  status        VARCHAR(255),
  data          DATE,
  horario       TIME,
  preco         DECIMAL(10,2)
);

  `;

  try {
    await pool.query(query);
    console.log('Tabela "tarefas" criada com sucesso.');
  } catch (err) {
    console.error('Erro ao criar a tabela:', err.message);
    console.error(err.stack);
  } finally {
    pool.end();
  }
}

migrate();