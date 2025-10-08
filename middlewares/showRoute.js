// middlewares/showRoute.js
// exporta uma factory que cria um middleware que mostra apenas uma página com o nome da rota
module.exports = function showRoute(name) {
  return (req, res, next) => {
    try {
      // Exibe apenas o nome da rota (e um link opcional para voltar ao índice)
      res.send(`
        <h1>${escapeHtml(name)}</h1>
        <p>Rota atual: ${escapeHtml(req.originalUrl)}</p>
        <p><a href="/">Voltar para /</a></p>
      `);
    } catch (err) {
      next(err);
    }
  };
};

// pequena função de escape para prevenir XSS
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
