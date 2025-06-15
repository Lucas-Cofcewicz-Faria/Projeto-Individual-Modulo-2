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

### Modelo MVC

A arquitetura MVC (Model-View-Controller) é um pilar central da organização lógica e estrutural do sistema desenvolvido. O padrão MVC separa a aplicação em três camadas principais: Model, responsável pela lógica de dados; View, pela interface com o usuário; e Controller, pela intermediação entre os dados e a visualização. Essa separação facilita a manutenção, escalabilidade e entendimento do projeto.
Com base nesse paradigma, foi desenvolvido o diagrama abaixo, que ilustra de forma clara e objetiva a interação entre as funcionalidades acessadas pelo usuário final e as estruturas de dados persistidas no banco de dados.
O diagrama está organizado da seguinte forma:

#### Cliente: 
Representa o navegador do usuário, que interage diretamente com a interface da aplicação (Views).

#### Views:
 São as interfaces visuais que exibem informações e recebem entradas dos usuários. Cada uma está conectada a um ou mais Controllers, que processam as requisições e respostas. As views implementadas incluem o catálogo de salas, login e reserva de salas.

#### Controllers: 
Intermediários que recebem as ações da View, processam as regras de negócio e comunicam-se com os Models. Eles são responsáveis por operações como listar, gravar, atualizar e deletar dados das entidades do sistema: usuários, reservas, preços, salas e localizações.

#### Models: 
Representam a estrutura e manipulação dos dados, mapeando as entidades do banco de dados. Eles são acessados pelos Controllers para executar operações que envolvem persistência, consulta ou modificação de dados.

#### 
Servidor de Banco de Dados: Utiliza PostgreSQL, integrado ao Supabase, para armazenamento e gerenciamento dos dados de forma confiável e escalável.

As conexões entre as camadas estão representadas por linhas coloridas, que facilitam a visualização do fluxo de dados em tempo real — desde a entrada do usuário até a persistência final no banco. Esse mapeamento contribui para a clareza da estrutura e o alinhamento da equipe de desenvolvimento com os objetivos técnicos do sistema.

![Modelo MVC](assets/mvc_diagram.png)

### Processo de desenvolvimento dos controllers:

#### Configuração do Banco de Dados

A conexão com o banco foi feita usando o PostgreSQL. Para configurá-la, criei um arquivo `.env` na raiz do projeto para guardar as credenciais:

```env
DATABASE_URL=postgresql://postgres.pclmxfodzyegvmjuthxb:1234@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
DB_HOST=aws-0-sa-east-1.pooler.supabase.com
DB_PORT=5432
DB_USER=postgres.pclmxfodzyegvmjuthxb
DB_PASSWORD=1234
DB_NAME=postgres
DB_DATABASE=postgres
PORT=3000
DB_SSL=true
```

Depois disso, a conexão foi configurada no arquivo `config/database.js`:

```javascript
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

A estrutura do banco foi criada com uma migração (`migrate.js`) e rodada pelo comando:

```bash
npm run migrate
```

Isso criou todas as tabelas necessárias para o funcionamento do sistema. usei ORM, os comandos SQL estão escritos direto nos controllers.

#### Testes da API

Desenvolvi um controller separado para cada entidade da base: `Users`, `Salas`, `Reservas`, `Precos` e `Localizacoes`. Para testar todos os controllers, usei o **Postman**. Testei cada função do CRUD em todas as rotas, validando tanto respostas esperadas quanto erros.

#### Testes feitos:

- **Users**  
  - `POST /api/users` → Criação de usuário  
  - `GET /api/users` → Listagem de todos os usuários 
  - `PUT /api/users/:iduser` → Edição  
  - `DELETE /api/users/:iduser` → Exclusão  

- **Salas**  
  - `POST /api/salas` → Criação de uma sala 
  - `GET /api/salas` → Listagem de todas as salas  
  - `PUT /api/salas/:idsala` → Edição de uma sala
  - `DELETE /api/salas/:idsala` → Exclusão de uma sala


- **Reservas**  
 - `POST /api/reservas` → Criação de uma reserva  
 - `GET /api/reservas` → Listagem de todas as reservas  
 - `PUT /api/reservas/:idreserva` → Edição de uma reserva 
 - `DELETE /api/reservas/:idreserva` → Exclusão de uma reserva 


- **Preços**  
 - `POST /api/precos` → Criação de um preço 
 - `GET /api/precos` → Listagem de todos os preços
 - `PUT /api/precos/:idpreco` → Edição de um preço
 - `DELETE /api/precos/:idpreco` → Exclusão de um preço


- **Localizações**  
 - `POST /api/localizacoes` → Criação de uma localização  
 - `GET /api/localizacoes` → Listagem de todas as localizações 
 - `PUT /api/localizacoes/:idlocalizacao` → Edição de uma localização
 - `DELETE /api/localizacoes/:ididlocalizacao` → Exclusão de uma localização


Testei cada controller manualmente e simulei situações com dados inválidos, IDs inexistentes e campos obrigatórios faltando para garantir que os retornos de erro também estavam funcionando corretamente.

### Sistema de Login
O sistema de login do RoomBooky foi desenvolvido com foco em segurança e funcionalidade. Ele permite que apenas usuários autenticados possam realizar reservas, protegendo a aplicação de acessos não autorizados.

#### Fluxo de Login
Envio de Dados pelo Usuário
O usuário acessa a página de login e envia seu e-mail e senha pelo formulário.

#### Validação no Servidor
O backend recebe os dados e faz a busca no banco de dados para encontrar o usuário com o e-mail informado.

#### Comparação de Senha com Hash
A senha armazenada no banco está criptografada usando bcrypt. O sistema utiliza bcrypt.compare() para verificar se a senha informada bate com o hash salvo.

``` javascript
const bcrypt = require("bcrypt");
const isMatch = await bcrypt.compare(senhaEnviada, senhaDoBanco);
```

#### Redirecionamento ou Erro
Se a senha estiver correta, o usuário é redirecionado para a página de reservas.
Caso contrário, uma mensagem de erro é exibida.
