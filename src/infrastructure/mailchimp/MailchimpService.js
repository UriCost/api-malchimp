// Serviço responsável pela comunicação com a API do Mailchimp
const axios = require('axios');
const crypto = require('crypto');

const MailchimpService = {
  async subscribeOrUpdate({ email, nome, phone, tag, atualizar, apiKey, listId }) {
    const memberId = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const method = atualizar === '1' ? 'put' : 'post';

const datacenter = apiKey.split('-')[1]; // extrai 'us19' da chave

const url =
  method === 'put'
    ? `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members/${memberId}`
    : `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`;


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
          Authorization: `apikey ${apiKey}`,
          'Content-Type': 'application/json',
        },
        data,
      });

      return response.data;
    } catch (error) {
      const status = error.response?.status || 500;
      const detail = error.response?.data?.detail || error.message;
      const mailchimpError = error.response?.data || null;

      console.error('Erro ao enviar para o Mailchimp:', mailchimpError);

      // Lança erro padronizado para ser tratado pelo controller
      throw {
        success: false,
        statusCode: status,
        error: `Erro do Mailchimp: ${detail}`,
        details: {
          source: 'Mailchimp',
          ...mailchimpError,
        },
      };
    }
  },
};

module.exports = MailchimpService;
