const Sequelize = require('sequelize');
const connection = require('../database/database'); //conexão banco 

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// User.sync({ force: false });

// recriando tabelas
// Category.sync({ force: true });

module.exports = User;