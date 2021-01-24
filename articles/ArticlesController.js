const express = require("express");
const { default: slugify } = require("slugify");
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');



router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{ model: Category }],
    }).then((articles) => {

        res.render('admin/articles/index', { articles });
    }).catch(error => {
        res.redirect('/admin/articles/index')
    })

    // res.render('admin/articles/index');

});

router.get("/admin/articles/new", (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories });
    });
});

router.post('/articles/save', (req, res) => {
    const { title, body, category } = req.body;
    Article.create({
        title,
        slug: slugify(title),
        body,
        categoryId: category// campo que gerado quando tem relacionamento entre tabelas (Chave estrangeira)
    }).then(() => {
        res.redirect('/admin/articles');
    })
});

//deletando dados do bando
router.post('/article/delete', (req, res) => {
    const { id } = req.body;
    if (id !== undefined) { //diferente de nulo
        if (!isNaN(id)) { //For numero
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles');
            })

        } else {
            res.redirect('admin/article');
        }
    } else { //NULL
        res.redirect('admin/article');

    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    const { id } = req.params;
    Article.findByPk(id).then((article) => {
        if (article !== undefined) {

            Category.findAll().then(categories => { //select

                res.render("admin/articles/edit", { categories, article })
            });
        } else {
            res.redirect("/");

        }
    }).catch(err => {
        res.redirect("/");
    })
});

router.post("/articles/update", (req, res) => {
    const { id } = req.body; //pegando id
    const { title } = req.body;
    const { body } = req.body;
    const { category } = req.body;


    Article.update({ title: title, body: body, categoryId: category, slug: slugify(title) }, {
        where: { id: id }
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

//logica de paginação
router.get("/articles/page/:num", (req, res) => {
    let page = req.params.num;
    let offset = 0;

    if (isNaN(page) || page === 1) {
        offset = 0;
    } else {
        offset = (parseInt(page)) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        let next;
        if (offset + 4 >= articles.count) {
            next = false;
        } else {
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next, // se vai existir ou não paginação
            articles: articles
        }

        Category.findAll().then((categories) => {
            res.render("admin/articles/page", { result: result, categories: categories });
        })
    })


});

module.exports = router;