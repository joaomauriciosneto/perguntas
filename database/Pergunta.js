const Sequelize = require('sequelize');
const connection = require('./database');

// criação da tabela (Model)
const Pergunta = connection.define('pergunta', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// se a tabela existir, não vai forçar criar essa tabela novamente
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;