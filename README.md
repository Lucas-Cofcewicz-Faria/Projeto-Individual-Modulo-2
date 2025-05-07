# Projeto-Individual-Modulo-2

### Sistema Escolhido
Para esse projeto, optei por desenvolver um simples sistema de reserva de salas, onde o usuário se cadastra e consegue reservar salas para eventos e outros usos.

### Estrutura de Pastas
Para manter um ambiente organizado, a estrutura M.V.C (Model View Controller) sera utilizada. Com isso em mente optei por a estrutura de pastas a seguir:
``` 
meu-projeto/
│
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal que inicializa o servidor
└── rest.http              # Teste de endpoints (opcional)
```

### Como rodar o projeto?
Mas afinal como posso iniciar o servidor do projeto? Nesse projeto os dois métodos mais fáceis de iniciar o servidor são usar os comandos "npm start" ou "node server.js" em um novo terminal. Depois disso, como o servidor inicia no port 3000 é apenas entrar nessa página http://localhost:3000.

