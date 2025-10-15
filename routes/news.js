var express = require('express');
var router = express.Router();

/* GET news page. */
router.get('/', function(req, res, next) {
  // resposta simples em texto conforme solicitado
  res.send('news');
});

module.exports = router;
