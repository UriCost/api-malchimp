// Arquivo principal para iniciar o servidor Express
// src/server.js
require('dotenv').config(); // Carrega as variáveis do .env
const express = require('express');
const routes = require('./routes'); // Importa as rotas definidas

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Permite receber JSON no body das requisições
app.use('/api', routes); // Todas as rotas estarão sob o caminho /api

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
