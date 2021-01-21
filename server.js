const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');

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
        console.log('Conexão database feita com sucesso!')
    }).catch(erro => {
        console.log(erro)
    });

//rotas
app.use('/', categoriesController); // utilizar rotas que estão dentro desse arquivo


app.listen(8080, () => {
    console.log("O servidor está rodando!");
});