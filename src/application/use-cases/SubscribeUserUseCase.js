// Caso de uso para inscrição de usuário
// src/application/use-cases/SubscribeUserUseCase.js

const MailchimpService = require('../../infrastructure/mailchimp/MailchimpService');
const User = require('../../domain/entities/User');

const SubscribeUserUseCase = {
  async execute({ email, nome, phone, tag, atualizar }) {
    // Valida os dados com base nas regras do domínio (User)
    const user = new User(email, nome, phone);

    // Envia os dados para o serviço do Mailchimp
    const response = await MailchimpService.subscribeOrUpdate({
      email: user.email,
      nome: user.nome,
      phone: user.phone,
      tag,
      atualizar,
    });

    return response;
  },
};

module.exports = SubscribeUserUseCase;
