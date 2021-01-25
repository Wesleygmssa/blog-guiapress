const Sequelize = require('sequelize');
const connection = require('../database/database'); //conexão banco 


//criação de tabela
const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Category.sync({ force: true }); // recriando tabelas

module.exports = Category;