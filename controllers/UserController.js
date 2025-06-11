
const bcrypt = require('bcrypt');
const User   = require('../models/User');
const saltRounds = 10;

exports.criarConta = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  try {
   
    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(400).json({ error: 'Este e-mail já está em uso.' });
    }

   
    const hash = await bcrypt.hash(senha, saltRounds);

   
    const newUser = await User.createUser({ nome, email, senha: hash });

    
    req.session.userId = newUser.iduser;

    return res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error('[criarConta] Erro interno:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    req.session.userId = user.iduser;

    return res.json({
      success: true,
      user: { iduser: user.iduser, nome: user.nome, email: user.email }
    });
  } catch (err) {
    console.error('[login] Erro interno:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

exports.criarUsers  = async (req, res) => { };
exports.listarUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    return res.json(users);
  } catch (err) {
    console.error('[listarUsers] Erro interno:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
exports.editarUser = async (req, res) => {
  try {
    const { iduser } = req.params;
    const { nome, email, senha } = req.body;
    const hash = senha ? await bcrypt.hash(senha, saltRounds) : undefined;
    const updated = await User.updateUser(iduser, { nome, email, senha: hash });
    if (!updated) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.json(updated);
  } catch (err) {
    console.error('[editarUser] Erro interno:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
exports.excluirUser = async (req, res) => {
  try {
    const { iduser } = req.params;
    const deleted = await User.deleteUser(iduser);
    if (!deleted) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('[excluirUser] Erro interno:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
