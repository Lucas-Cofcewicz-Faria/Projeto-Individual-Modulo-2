
const User = require('../models/User');

exports.criarUsers = async (req, res) => {
  try {
    const { nome, senha, email } = req.body;
    const newUser = await User.createUsers({ nome, senha, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarUser = async (req, res) => {
  try {
    const { iduser } = req.params;
    const { nome, senha, email } = req.body;
    const updated = await User.updateUser(iduser, { nome, senha, email });
    if (!updated) {
      return res.status(404).json({ message: 'User não encontrado' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirUser = async (req, res) => {
  try {
    const { iduser } = req.params;
    const deleted = await User.deleteUser(iduser);
    if (!deleted) {
      return res.status(404).json({ message: 'User não encontrado' });
    }
    res.status(200).json({ message: 'User excluido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
