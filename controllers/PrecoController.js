
const Preco = require('../models/Preco');

exports.criarPreco = async (req, res) => {
  try {
    const { sala_id, dia_semana, hora_inicio, hora_fim, preco_total } = req.body;
    const newPreco = await Preco.createPreco({ sala_id, dia_semana, hora_inicio, hora_fim, preco_total });
    res.status(201).json(newPreco);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarPrecos = async (req, res) => {
  try {
    const precos = await Preco.getAllPrecos();
    res.status(200).json(precos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarPreco = async (req, res) => {
  try {
    const { idpreco } = req.params;
    const { sala_id, dia_semana, hora_inicio, hora_fim, preco_total } = req.body;
    const updated = await Preco.updatePreco(idpreco, {sala_id, dia_semana, hora_inicio, hora_fim, preco_total});
    if (!updated) {
      return res.status(404).json({ message: 'Preco não encontrada' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirPreco = async (req, res) => {
  try {
    const { idpreco } = req.params;
    const deleted = await Preco.deletePreco(idpreco);
    if (!deleted) {
      return res.status(404).json({ message: 'Preco não encontrado' });
    }
    res.status(200).json({ message: 'Preco excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
