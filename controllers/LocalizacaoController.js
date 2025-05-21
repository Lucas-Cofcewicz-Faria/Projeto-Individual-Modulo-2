// controllers/TarefaController.js
const pool = require('../config/database');

// Criar uma nova Localizacao
exports.criarLocalizacao = async (req, res) => {
  const { nomelocal, endereco, andar } = req.body;

  const query = 'INSERT INTO localizacoes (nomelocal, endereco, andar) VALUES ($1, $2, $3) RETURNING *';
  const values = [nomelocal, endereco, andar];

  try {
    const result = await pool.query(query, values);
    const localizacao = result.rows[0];
    res.status(201).json(localizacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log(req.body);
};

// Listar todas as localizacoes
exports.listarLocalizacoes = async (req, res) => {
  const query = 'SELECT * FROM localizacoes';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log(req.body);
};

// Editar uma localizacao
exports.editarLocalizacao = async (req, res) => {
  const { idlocalizacao } = req.params;
  const { nomelocal, endereco, andar } = req.body;

  const query = `
    UPDATE localizacoes SET nomelocal = $1, endereco = $2, andar = $3
    WHERE idlocalizacao = $4 RETURNING *`;
  const values = [nomelocal, endereco, andar, idlocalizacao];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Localizacao não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log(req.body);
};

// Excluir uma localizacao
exports.excluirLocalizacao = async (req, res) => {
  const { idlocalizacao } = req.params;
  const query = 'DELETE FROM localizacoes WHERE idlocalizacao = $1 RETURNING *';
  const values = [idlocalizacao];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Localizacao não encontrada' });
    }
    res.status(200).json({ message: 'Localizacao excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};