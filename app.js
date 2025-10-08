// app.js
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Loga todas as requisições
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página não encontrada</h1>
    <p>Rota ${req.originalUrl} não existe.</p>
    <p><a href="/">Voltar</a></p>
  `);
});

// Error handler melhorado: loga stack e envia mensagem
app.use((err, req, res, next) => {
  console.error('=== ERRO CAPTURADO ===');
  console.error(err && err.stack ? err.stack : err);
  console.error('=======================');
  // Em dev você poderia enviar a stack para o browser, mas por segurança aqui só mostramos
  res.status(500).send('<h1>Erro interno do servidor</h1><pre>Veja o console para detalhes.</pre>');
});

// Segurança: loga exceções não capturadas e rejeições
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
