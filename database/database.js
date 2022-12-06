const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'cont1975', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;