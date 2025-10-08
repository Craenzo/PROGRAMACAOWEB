// routes/users.js
const express = require('express');
const router = express.Router();
const showRoute = require('../middlewares/showRoute');

// GET /users  - usa middleware que exibe só o nome da rota
router.get('/', showRoute('users (index) (/users)'));

// GET /users/signup - exibe apenas o nome da rota (requisito)
router.get('/signup', showRoute('signup (/users/signup)'));

// GET /users/signin
// comportamento: se houver userid na query -> redirect /users/:userid
// se não houver -> redireciona pra /users/signup
router.get('/signin', (req, res) => {
  const userid = req.query.userid || null;
  if (!userid) {
    // sem userid: redireciona para signup (requisito #4)
    return res.redirect('/users/signup');
  }
  // com userid: redireciona para /users/:userid (requisito #3)
  return res.redirect(`/users/${encodeURIComponent(userid)}`);
});

// GET /users/:userid  -> exibe mensagem de boas-vindas usando o userid
router.get('/:userid', (req, res, next) => {
  try {
    const userid = req.params.userid;
    res.send(`
      <h1>Bem-vindo, ${escapeHtml(userid)}!</h1>
      <p>Rota: /users/${escapeHtml(userid)}</p>
      <p><a href="/users">Voltar</a></p>
    `);
  } catch (err) {
    next(err);
  }
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
