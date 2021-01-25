const Sequelize = require('sequelize');
const connection = require('../database/database'); //conexão banco 
const Category = require('../categories/Category');

//criação de tabela
const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});



Category.hasMany(Article); // uma categoria tem muitos artigos;

Article.belongsTo(Category); //categoryId //relacionamento de tabelas // um artigo pertece a uma categoria;

// Article.sync({ force: true });  // recriando tabela


module.exports = Article;