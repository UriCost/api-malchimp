// Serviço responsável pela comunicação com a API do Mailchimp
// src/infrastructure/mailchimp/MailchimpService.js

const axios = require('axios');
const crypto = require('crypto');
const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } = require('../../config/env');

const MailchimpService = {
  async subscribeOrUpdate({ email, nome, phone, tag, atualizar }) {
    const memberId = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const method = atualizar === '1' ? 'put' : 'post';

    const url =
      method === 'put'
        ? `https://us7.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${memberId}`
        : `https://us7.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

    const data = {
      email_address: email,
      status: 'subscribed',
      tags: [tag],
      merge_fields: {
        FNAME: nome,
        PHONE: phone,
      },
    };

    try {
      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        data,
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao enviar para o Mailchimp:', error.response?.data || error.message);
      throw new Error('Falha ao enviar dados para o Mailchimp');
    }
  },
};

module.exports = MailchimpService;
