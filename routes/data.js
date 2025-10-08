const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('data', { title: 'Data (GET)', method: 'GET' });
});

router.post('/', (req, res) => {
  const payload = req.body || {};
  res.render('data', { title: 'Data (POST)', method: 'POST', payload: JSON.stringify(payload, null, 2) });
});

module.exports = router;
