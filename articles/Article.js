const Sequelize = require('sequelize');
const connection = require('../database/database'); //conexão banco 
const Category = require('../categories/Category');

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


// uma categoria tem muitos artigos;
Category.hasMany(Article);

// um artigo pertece a uma categoria;
Article.belongsTo(Category);

// Article.sync({ force: true }); 
// recriando tabela

module.exports = Article;