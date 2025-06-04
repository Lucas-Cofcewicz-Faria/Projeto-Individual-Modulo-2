// controllers/SalaController.js
const Reserva = require('../models/Reserva');

exports.criarReserva = async (req, res) => {
  try {
    const { user_id, sala_id, status, data, horario, preco_id } = req.body;
    const newReserva = await Reserva.createReserva({ user_id, sala_id, status, data, horario, preco_id });
    res.status(201).json(newReserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.getAllReservas();
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarReserva = async (req, res) => {
  try {
    const { idreserva } = req.params;
    const { user_id, sala_id, status, data, horario, preco_id } = req.body;
    const updated = await Reserva.updateReserva(idreserva, { user_id, sala_id, status, data, horario, preco_id });
    if (!updated) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirReserva = async (req, res) => {
  try {
    const { idreserva } = req.params;
    const deleted = await Reserva.deleteReserva(idreserva);
    if (!deleted) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json({ message: 'Reserva excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
