// Rotas da aplicação
// src/routes/index.js
const express = require('express');
const router = express.Router();
const MailchimpController = require('../interfaces/controllers/MailchimpController');

// Rota de inscrição/atualização
router.post('/subscribe', MailchimpController.handleSubscribe);

module.exports = router;
