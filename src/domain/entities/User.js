// Entidade User representando o domínio
// src/domain/entities/User.js

class User {
  constructor(email, nome, phone) {
    if (!email || !email.includes('@')) {
      throw new Error('Email inválido');
    }

    this.email = email;
    this.nome = nome || '';
    this.phone = phone || '';
  }
}

module.exports = User;
