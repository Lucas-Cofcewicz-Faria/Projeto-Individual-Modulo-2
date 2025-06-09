// controllers/PrecoController.js
const Preco = require('../models/Preco');

// Cria um novo preço
exports.criarPreco = async (req, res) => {
  try {
    const novo = await Preco.criarPreco(req.body);
    return res.status(201).json(novo);
  } catch (err) {
    console.error('[criarPreco]', err);
    return res.status(500).json({ error: err.message });
  }
};

// Lista todos os preços
exports.listarPrecos = async (req, res) => {
  try {
    const todos = await Preco.listarPrecos();
    return res.status(200).json(todos);
  } catch (err) {
    console.error('[listarPrecos]', err);
    return res.status(500).json({ error: err.message });
  }
};

// Edita um preço existente
exports.editarPreco = async (req, res) => {
  try {
    const { idpreco } = req.params;
    const atualizado = await Preco.editarPreco(idpreco, req.body);
    if (!atualizado) {
      return res.status(404).json({ error: 'Preço não encontrado.' });
    }
    return res.json(atualizado);
  } catch (err) {
    console.error('[editarPreco]', err);
    return res.status(500).json({ error: err.message });
  }
};

// Exclui um preço
exports.excluirPreco = async (req, res) => {
  try {
    const { idpreco } = req.params;
    await Preco.excluirPreco(idpreco);
    return res.json({ message: 'Preço excluído com sucesso.' });
  } catch (err) {
    console.error('[excluirPreco]', err);
    return res.status(500).json({ error: err.message });
  }
};
