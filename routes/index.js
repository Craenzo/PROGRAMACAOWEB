// routes/index.js
const express = require('express');
const router = express.Router();
const showRoute = require('../middlewares/showRoute');

// Rota /  -> apenas mostra o nome da rota (usando middleware)
router.get('/', showRoute('index (/)'));

// /about -> mostra nome
router.get('/about', showRoute('about (/about)'));

// GET /data -> mostra nome
router.get('/data', showRoute('data (GET) (/data)'));

// POST /data -> recebe formulário e responde mostrando o valor
router.post('/data', (req, res) => {
  const valor = req.body.valor || '(vazio)';
  res.send(`<h1>Data (POST)</h1><p>Você enviou: ${escapeHtml(valor)}</p><p><a href="/data">Voltar</a></p>`);
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = router;
