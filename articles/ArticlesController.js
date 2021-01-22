const express = require("express");
const { default: slugify } = require("slugify");
const router = express.Router();
const Category = require('../categories/Category');

router.get('/articles', (req, res) => {
    res.send('Rota de artigos')
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
    });
});

module.exports = router;