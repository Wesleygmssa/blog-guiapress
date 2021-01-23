const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

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
app.use('/', categoriesController); // rotas de categorias
app.use('/', articlesController) // rotas de articles


app.get('/', (req, res) => {
    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => {
        res.render('index', { articles })
    })
    // res.render('index')
})

app.get('/:slug', (req, res) => {
    const { slug } = req.params;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            res.render("article", { article });
        } else {
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})


app.listen(8080, () => {
    console.log("O servidor está rodando!");
});