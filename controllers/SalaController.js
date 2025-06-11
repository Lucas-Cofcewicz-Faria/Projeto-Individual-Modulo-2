
const Sala = require('../models/Sala');

// → Cria sala (JSON)
exports.criarSala = async (req, res) => {
  try {
    const { nomesala, tamanho, idlocalizacao } = req.body;
    const newSala = await Sala.createSala({ nomesala, tamanho, idlocalizacao });
    return res.status(201).json(newSala);
  } catch (err) {
    console.error('[criarSala]', err);
    return res.status(500).json({ error: 'Erro interno ao criar sala.' });
  }
};

// → Lista todas as salas (JSON)
exports.listarSalas = async (req, res) => {
  try {
    const all = await Sala.getAllSalas();
    return res.json(all);
  } catch (err) {
    console.error('[listarSalas]', err);
    return res.status(500).json({ error: 'Erro interno ao listar salas.' });
  }
};

// → Edita sala por ID (JSON)
exports.editarSala = async (req, res) => {
  try {
    const { idsala } = req.params;
    const updated = await Sala.updateSala(idsala, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Sala não encontrada.' });
    }
    return res.json(updated);
  } catch (err) {
    console.error('[editarSala]', err);
    return res.status(500).json({ error: 'Erro interno ao editar sala.' });
  }
};

// → Exclui sala por ID (JSON)
exports.excluirSala = async (req, res) => {
  try {
    const { idsala } = req.params;
    const deleted = await Sala.deleteSala(idsala);
    if (!deleted) {
      return res.status(404).json({ error: 'Sala não encontrada.' });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('[excluirSala]', err);
    return res.status(500).json({ error: 'Erro interno ao excluir sala.' });
  }
};

// → Busca salas com filtros (JSON)
exports.buscarComFiltrosJSON = async (req, res) => {
  try {
    const filtros = { sala: req.query.sala || null, tamanho: req.query.tamanho || null };
    const rows = await Sala.buscarComFiltros(filtros);
    return res.json(rows);
  } catch (err) {
    console.error('[buscarComFiltrosJSON]', err);
    return res.status(500).json({ error: 'Erro ao buscar salas.' });
  }
};

// → Busca salas com filtros e renderiza view (EJS)
exports.buscarComFiltrosEJS = async (req, res) => {
  try {
    const filtros = { sala: req.query.sala || null, tamanho: req.query.tamanho || null };
    const salasEncontradas = await Sala.buscarComFiltros(filtros);
    const userId = req.session?.userId || '';
    return res.render('salaspage', {
      salas:   salasEncontradas,
      filters: filtros,
      userId
    });
  } catch (err) {
    console.error('[buscarComFiltrosEJS]', err);
    return res.status(500).send('Erro inesperado ao buscar salas.');
  }
};
