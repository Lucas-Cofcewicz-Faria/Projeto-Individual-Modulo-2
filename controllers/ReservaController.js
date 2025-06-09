// controllers/ReservaController.js
const Reserva = require('../models/Reserva');
const Preco   = require('../models/Preco');

function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function diffHours(t1, t2) {
  return (t2 - t1) / 1000 / 60 / 60;
}

// → Cria reserva
exports.criarReserva = async (req, res) => {
  try {
    const user_id = req.session.userId;
    if (!user_id) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const { sala_id, data_reserva, hora_inicio, hora_fim, preco_id } = req.body;
    if (!sala_id || !data_reserva || !hora_inicio || !hora_fim) {
      return res.status(400).json({ error: 'Campos sala, data e horários são obrigatórios.' });
    }

    const start = parseTime(hora_inicio);
    const end   = parseTime(hora_fim);
    if (end <= start) {
      return res.status(400).json({ error: 'Horário de fim deve ser após início.' });
    }

    // busca preço por hora e calcula total
    const precoHora = await Preco.getPrecoById(Number(preco_id));
    
    if (precoHora == null) {
      return res.status(404).json({ error: 'Preço por hora não encontrado para esta sala.' });
    }
    const duration    = diffHours(start, end);
    const preco_total = parseFloat((duration * precoHora).toFixed(2));

    // cria no banco
    const novaReserva = await Reserva.createReserva({
      user_id,
      sala_id: Number(sala_id),
      data_reserva,
      hora_inicio,
      hora_fim,
      preco_id: Number(preco_id),
      preco_total
    });

    return res.status(201).json({
      success: true,
      reserva: novaReserva
    });
  } catch (err) {
    console.error('[criarReserva]', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// → Lista todas as reservas
exports.listarReservas = async (req, res) => {
  try {
    const todas = await Reserva.getAllReservas();
    return res.json(todas);
  } catch (err) {
    console.error('[listarReservas]', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// → Edita uma reserva
exports.editarReserva = async (req, res) => {
  try {
    const { idreserva } = req.params;
    const atualizado = await Reserva.updateReserva(idreserva, req.body);
    if (!atualizado) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }
    return res.json(atualizado);
  } catch (err) {
    console.error('[editarReserva]', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// → Exclui uma reserva
exports.excluirReserva = async (req, res) => {
  try {
    const { idreserva } = req.params;
    const excluido = await Reserva.deleteReserva(idreserva);
    if (!excluido) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('[excluirReserva]', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
exports.dashboard = async (req, res) => {
  const user_id = req.session.userId;
  if (!user_id) return res.redirect('/login');

  try {
    const reservas = await Reserva.getReservasByUserId(user_id);
    return res.render('reservas', { reservas, userId: user_id });
  } catch (err) {
    console.error('[dashboard]', err);
    return res.status(500).send('Erro ao carregar suas reservas.');
  }
};
