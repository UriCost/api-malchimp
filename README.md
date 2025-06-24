# 📬 API Mailchimp (Multi-Conta) – Node.js + DDD

API para cadastro e atualização de contatos no Mailchimp, com suporte a múltiplas contas e listas, seguindo a arquitetura Domain-Driven Design (DDD).

---

## 🚀 Endpoints

### `POST /api/subscribe`

Envia ou atualiza um contato na lista do Mailchimp.

#### 🔗 URL
```
http://localhost:3000/api/subscribe
```

#### 📥 Body (JSON)

| Campo       | Tipo     | Obrigatório | Descrição                              |
|-------------|----------|-------------|----------------------------------------|
| `email`     | string   | ✅ Sim       | Email do contato                       |
| `nome`      | string   | ⛔ Não       | Nome completo                          |
| `phone`     | string   | ⛔ Não       | Telefone com DDD                       |
| `tag`       | string   | ⛔ Não       | Tag para agrupar contatos              |
| `atualizar` | string   | ⛔ Não       | `"1"` para atualizar, `"0"` para criar |
| `apiKey`    | string   | ✅ Sim       | Sua API Key do Mailchimp               |
| `listId`    | string   | ✅ Sim       | ID da lista (Audience ID)              |

#### 📤 Respostas

| Status | Tipo   | Exemplo                                                        |
|--------|--------|----------------------------------------------------------------|
| `200`  | JSON   | `{ "success": true, "result": { ...dados do Mailchimp... } }` |
| `400`  | JSON   | `{ "success": false, "message": "apiKey e listId são obrigatórios." }` |
| `500`  | JSON   | `{ "success": false, "message": "Erro interno" }`             |

---

## ⚙️ Configuração e Execução

### 📁 Clonar o projeto
```bash
git clone https://github.com/UriCost/api-malchimp.git
cd api-malchimp
```

### 📦 Instalar dependências
```bash
npm install
```

### ▶️ Rodar o servidor
```bash
npm run dev
```

---

## 🧱 Arquitetura

A API segue os princípios do **Domain-Driven Design (DDD)**:

| Camada          | Função                                                            |
|-----------------|--------------------------------------------------------------------|
| `server.js`     | Inicializa o Express e aplica as rotas                            |
| `routes/`       | Define os caminhos da API (`/subscribe`)                          |
| `controllers/`  | Recebe a requisição HTTP e chama o caso de uso                    |
| `use-cases/`    | Aplica a regra de negócio e coordena as ações                     |
| `entities/`     | Contém as regras do domínio (ex: validação de email do usuário)   |
| `infrastructure/`| Integra com serviços externos, como o Mailchimp                  |
| `config/`       | Carrega variáveis de ambiente, se necessário                      |

---

## 🧪 Exemplo de requisição via curl

```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "nome": "Fulano",
    "phone": "31999999999",
    "tag": "landing-page",
    "atualizar": "0",
    "apiKey": "SUA_API_KEY",
    "listId": "SUA_LIST_ID"
  }'
```

---

## 📄 Licença

MIT © Seu Nome ou Organização
