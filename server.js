const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./user/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./user/user');

//View engine
app.set('view engine', 'ejs');

//sessions
app.use(session({
    secret: "unhsgtfebgahlooejhnbagqzanbdgagyaikaneh", cookie: { maxAge: 3000000 }
}));

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
app.use('/', usersController);

// //sessão salvando os dados
// app.get("/session", (req, res) => {

// });

// //lendo os dados
// app.get("/leitura", (req, res) => {

// });

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {

            res.render('index', { articles, categories });
        })
    });
    // res.render('index')
});

app.get('/:slug', (req, res) => {
    const { slug } = req.params;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {

                res.render('article', { article, categories });
            })
        } else {
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    });
});

app.get("/category/:slug", (req, res) => {
    const { slug } = req.params;
    Category.findOne({
        where: {
            slug: slug,
        },
        include: [{ model: Article }] // join dentro de um array
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then((categories) => {
                res.render('index', { articles: category.articles, categories });
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect('/')
    })
});

app.listen(8080, () => {
    console.log("O servidor está rodando!");
});