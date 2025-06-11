
const Localizacao = require('../models/Localizacao');

exports.criarLocalizacao = async (req, res) => {
  try {
    const { nomelocal, endereco, andar } = req.body;
    const newLocalizacao = await Localizacao.createLocalizacao({ nomelocal, endereco, andar });
    res.status(201).json(newLocalizacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarLocalizacoes = async (req, res) => {
  try {
    const localizacoes = await Localizacao.getAllLocalizacoes();
    res.status(200).json(localizacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarLocalizacoes = async (req, res) => {
  try {
    const { idlocalizacao } = req.params;
    const { nomelocal, endereco, andar } = req.body;
    const updated = await Localizacao.updateLocalizacao(idlocalizacao, { nomelocal, endereco, andar });
    if (!updated) {
      return res.status(404).json({ message: 'Localizacao não encontrada' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirLocalizacao = async (req, res) => {
  try {
    const { idlocalizacao } = req.params;
    const deleted = await Localizacao.deleteLocalizacao(idlocalizacao);
    if (!deleted) {
      return res.status(404).json({ message: 'Localizacao não encontrada' });
    }
    res.status(200).json({ message: 'Localizacao excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
