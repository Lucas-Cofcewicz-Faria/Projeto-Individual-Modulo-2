// controllers/SalaController.js
const Sala = require('../models/Sala');

exports.criarSala = async (req, res) => {
  try {
    const { nomesala, tamanho, idlocalizacao } = req.body;
    const newSala = await Sala.createSala({ nomesala, tamanho, idlocalizacao });
    res.status(201).json(newSala);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarSalas = async (req, res) => {
  try {
    const salas = await Sala.getAllSalas();
    res.status(200).json(salas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarSala = async (req, res) => {
  try {
    const { idsala } = req.params;
    const { nomesala, tamanho, idlocalizacao } = req.body;
    const updated = await Sala.updateSala(idsala, { nomesala, tamanho, idlocalizacao });
    if (!updated) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirSala = async (req, res) => {
  try {
    const { idsala } = req.params;
    const deleted = await Sala.deleteSala(idsala);
    if (!deleted) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json({ message: 'Sala excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
