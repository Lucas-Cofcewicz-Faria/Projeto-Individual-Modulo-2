// controllers/TarefaController.js
const pool = require("../config/database");

// Criar uma nova reserva
exports.criarReserva = async (req, res) => {
  const { user_id, sala_id, status, data, horario, preco_id } = req.body;

  const query =
    "INSERT INTO reservas (user_id, sala_id, status, data, horario, preco_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [user_id, sala_id, status, data, horario, preco_id];

  try {
    const result = await pool.query(query, values);
    const reserva = result.rows[0];
    res.status(201).json(reserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as reservas
exports.listarReservas = async (req, res) => {
  const query = "SELECT * FROM reservas";

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma reserva
exports.editarReserva = async (req, res) => {
  const { idreserva } = req.params;
  const { user_id, sala_id, status, data, horario, preco_id } = req.body;

  const query = `
    UPDATE reservas SET user_id = $1, sala_id = $2, status = $3, data = $4, horario = $5, preco_id = $6
    WHERE idreserva = $7 RETURNING *`;
  const values = [user_id, sala_id, status, data, horario, preco_id, idreserva];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Reserva não encontrada" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma reserva
exports.excluirReserva = async (req, res) => {
  const { idreserva } = req.params;
  const query = "DELETE FROM reservas WHERE idreserva = $1 RETURNING *";
  const values = [idreserva];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Reserva não encontrada" });
    }
    res.status(200).json({ message: "Reserva excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
