// Controller para lidar com as requisições da API
// src/interfaces/controllers/MailchimpController.js
const SubscribeUserUseCase = require('../../application/use-cases/SubscribeUserUseCase');

const MailchimpController = {
  async handleSubscribe(req, res) {
    try {
      const { email, nome, phone, tag, atualizar, apiKey, listId } = req.body;

      if (!apiKey || !listId) {
        return res.status(400).json({
          success: false,
          message: 'apiKey e listId são obrigatórios.',
        });
      }

      const result = await SubscribeUserUseCase.execute({
        email,
        nome,
        phone,
        tag,
        atualizar,
        apiKey,
        listId,
      });

      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.error('Erro:', error.message);
      return res.status(500).json({ success: false, message: 'Erro interno' });
    }
  },
};

module.exports = MailchimpController;
