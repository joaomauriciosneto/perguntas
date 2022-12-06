const Sequelize = require('sequelize');
const connection = require('./database');

// criando a tabela resposta no mysql
const Resposta = connection.define('resposta', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  // relacionando com a tabela pergunta
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Resposta.sync({force: false});

module.exports = Resposta;