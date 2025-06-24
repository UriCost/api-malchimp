// Caso de uso para inscrição de usuário
// src/application/use-cases/SubscribeUserUseCase.js

const MailchimpService = require('../../infrastructure/mailchimp/MailchimpService');
const User = require('../../domain/entities/User');

const SubscribeUserUseCase = {
  async execute({ email, nome, phone, tag, atualizar, apiKey, listId }) {
    const user = new User(email, nome, phone);

    const response = await MailchimpService.subscribeOrUpdate({
      email: user.email,
      nome: user.nome,
      phone: user.phone,
      tag,
      atualizar,
      apiKey,
      listId,
    });

    return response;
  },
};

module.exports = SubscribeUserUseCase;
