const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

//View engine
app.set('view engine', 'ejs');

// static
app.use(express.static('public'));

//Body parser forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection
connection.authenticate()
    .then(() => {
        console.log('Conexão database feita com sucesso!');
    }).catch(erro => {
        console.log(erro);
    });

//rotas
app.use('/', categoriesController); // rotas de categorais
app.use('/', articlesController) // rotas de articles

app.listen(8080, () => {
    console.log("O servidor está rodando!");
});