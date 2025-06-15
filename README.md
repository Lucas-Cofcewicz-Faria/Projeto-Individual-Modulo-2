# Projeto-Individual-Modulo-2

## RoomBooky — Reserve a sua sala hoje

### Descrição do Projeto  
RoomBooky é um sistema de reserva de salas desenvolvido para facilitar o agendamento de espaços em prédios compartilhados. A aplicação permite que os usuários visualizem as salas disponíveis, filtrem por critérios específicos e realizem reservas de forma prática e segura.

### Funcionalidades  
- **Sistema de autenticação** para controle de acesso e personalização da experiência do usuário  
- **Filtros de busca** por nome, localização, preço e descrição da sala  
- **Cálculo automático de preço** com base nas características da sala  
- **Interface intuitiva** para facilitar a navegação e o processo de reserva  
- **Formulário de reserva integrado** à página de resultados  

### Estrutura de Pastas
Para manter um ambiente organizado, a estrutura M.V.C (Model View Controller) será utilizada. Com isso em mente, optei pela estrutura de pastas a seguir:
```
meu-projeto/
│
├── config/
│   └── database.js
├── controllers/
│   └── HomeController.js
├── models/
│   └── User.js
├── routes/
│   └── index.js
├── services/
│   └── userService.js
├── assets/
├── scripts/
├── styles/
├── tests/
│   └── example.test.js
├── .gitignore
├── .env.example
├── jest.config.js
├── package-lock.json
├── package.json
├── readme.md
├── server.js
└── rest.http
```

### Tecnologias e Dependências

- **Linguagem:** JavaScript (Node.js)  
- **Framework:** Express  
- **Template Engine:** EJS  
- **Banco de Dados:** PostgreSQL  
- **Hash de senhas:** bcrypt  
- **Variáveis de ambiente:** dotenv  
- **Controle de CORS:** cors  
- **Monitoramento em dev:** nodemon  

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Lukera-Faria/Projeto-Individual-M-dulo-2.git
   cd Projeto-Individual-M-dulo-2
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie um arquivo `.env`** na raiz do projeto com o seguinte conteúdo (ajuste conforme necessário):
   ```env
   DATABASE_URL=postgresql://<usuario>:<senha>@<host>:5432/<database>
   DB_HOST=<host>
   DB_PORT=5432
   DB_USER=<usuario>
   DB_PASSWORD=<senha>
   DB_NAME=<database>
   DB_DATABASE=<database>
   PORT=3000
   DB_SSL=true
   ```

4. **Execute o projeto em ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Navegue o site e crie uma conta com email e senha**

6. **Bem-vindo ao RoomBooky, agora é só escolher e reservar!**

### Demonstração Visual do Sistema

A seguir, você pode visualizar o funcionamento do sistema RoomBooky por meio de GIFs demonstrativos:

#### Página Principal + Filtros de Busca

![Página Principal e Filtro](/assets/PaginaPrincipal.gif)

Na **homepage**, o usuário pode buscar por salas com base no nome e no tamanho desejado. Após clicar em "Reserve", ele é direcionado à página de reservas com uma visualização clara das opções disponíveis e informações como preço, localização, e formulário de reserva.

#### Tela de Login

![Tela de Login](/assets/login.gif)

Na **página de login**, o usuário pode inserir suas credenciais para acessar o sistema. Caso ainda não possua uma conta, ele pode criar uma pelo botão de cadastro. A autenticação é segura e essencial para acessar as reservas.

#### Página de Reservas e Formulário

![Página de Reservas](/assets/reservas.gif)

Após selecionar uma sala, o usuário é levado à **página de reserva**, onde insere a data, horário de início e término da reserva. O sistema calcula automaticamente o preço total da reserva com base no tempo selecionado e no valor por hora da sala.

### Manipulando Reservas com o Postman

Algumas funcionalidades administrativas (como criar, editar ou excluir reservas) não estão disponíveis via interface gráfica. Para isso, utilize o uso da ferramenta [Postman](https://www.postman.com/), que permite testar requisições HTTP de forma prática.

### Explicação em video
Explicação em video
```
https://youtu.be/vhDTUSmjU6E
```

#### Endpoints disponíveis:

- `POST api/reservas` – Criar nova reserva  
- `PUT api/reservas/:idreserva` – Atualizar reserva existente  
- `DELETE api/reservas/:idreserva` – Excluir uma reserva  
- `GET api/reservas` – Listar todas as reservas  

####  Tutorial com Exemplo de Corpo (Body)

**1. Criar uma reserva**  
- Método: `POST`  
- URL: `http://localhost:3000/api/reservas`  
- Body (raw JSON):
  ```json
  {
    "user_id": 1,
    "sala_id": 2,
    "status": "confirmada",
    "data_reserva": "2025-06-20",
    "hora_inicio": "14:00",
    "hora_fim": "16:00",
    "preco_id": 3,
    "preco_total": 60.0
  }
  ```

**2. Atualizar uma reserva existente**  
- Método: `PUT`  
- URL: `http://localhost:3000/api/reservas/1`  
- Body (raw JSON):
  ```json
  {
    "data_reserva": "2025-06-21",
    "hora_inicio": "15:00",
    "hora_fim": "17:00",
    "status": "remarcada",
    "preco_total": 70.0
  }
  ```

**3. Excluir uma reserva**  
- Método: `DELETE`  
- URL: `http://localhost:3000/api/reservas/1`

**4. Listar todas as reservas**  
- Método: `GET`  
- URL: `http://localhost:3000/api/reservas`

#### Observações
- Certifique-se de usar **IDs válidos** que já existam nas tabelas `users`, `salas` e `precos`.
- O campo `preco_total` pode ser calculado manualmente no Postman ou tratado automaticamente pelo backend.
- Campos como `status` são opcionais, mas podem ser úteis para indicar o andamento da reserva (ex: "confirmada", "remarcada", "cancelada").
