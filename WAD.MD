# Documentação do Projeto-Individual-Modulo-2

### Introdução:
Este projeto tem como objetivo desenvolver uma plataforma simples de reservas de salas. Nela, um banco de dados será responsável por registrar e organizar os pedidos feitos pelos usuários, garantindo que as informações sejam armazenadas de forma estruturada e acessível.

### Modelo Relacional
É de extrema importância organizar as categorias e tabelas de um banco de dados antes de começar o desenvolvimento de uma plataforma. Com isso em mente desenvolvi esse simples modelo relacional, o qual demonstra as principais relações no meu banco de dados.

![Modelo do Banco](assets/modelo-banco.png)

Para este projeto, optei por usar cinco tabelas principais: Usuários, que representam as pessoas que acessam a plataforma, com nome, ID, senha e email; Salas, que podem ser reservadas e trazem informações como nome, tamanho e localização; Localizações, que guardam os dados de onde cada sala está, como nome do lugar, endereço e andar; Preços, que definem o valor de cada sala dependendo do dia da semana e do horário; e, por fim, Reservas, onde ficam todas as informações das reservas feitas, como status, data, horário, valor final e o vínculo com o usuário e a sala. O valor da reserva é calculado automaticamente com base nas regras de preço, levando em conta o horário e o dia em que ela foi feita, o que deixa tudo mais flexível e preciso.

### Modelo Físico (Código SQL):
```
CREATE TABLE users (
  idUser INTEGER PRIMARY KEY,
  nome VARCHAR(255),
  senha VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE localizacoes (
  idLocalizacao INTEGER PRIMARY KEY,
  nomeLocal VARCHAR(255),
  endereco VARCHAR(255),
  andar VARCHAR(255)
);

CREATE TABLE salas (
  idSala INTEGER PRIMARY KEY,
  nomeSala VARCHAR(255),
  tamanho VARCHAR(255),
  idLocalizacao INTEGER NOT NULL,
  FOREIGN KEY (idLocalizacao) REFERENCES localizacoes(idLocalizacao)
);

CREATE TABLE precos (
  idPreco INTEGER PRIMARY KEY,
  sala_id INTEGER NOT NULL,
  diaSemana VARCHAR(255),
  horaInicio TIME,
  horaFim TIME,
  preco DECIMAL(10,2),
  FOREIGN KEY (sala_id) REFERENCES salas(idSala)
);

CREATE TABLE reservas (
  idReserva INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  sala_id INTEGER NOT NULL,
  status VARCHAR(255),
  data DATE,
  horario TIME,
  preco DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(idUser),
  FOREIGN KEY (sala_id) REFERENCES salas(idSala)
);
```
Além do modelo relacional, também criei o modelo físico, com o código SQL já estruturado e pronto pra ser usado. Ele é importante porque transforma o que foi pensado no papel em algo que realmente funciona no banco de dados, permitindo que tudo seja executado na prática.







