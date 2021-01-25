const express = require("express");
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');



router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render('admin/categories/new');
});

//Salvando dados no bando
router.post("/categories/save", adminAuth, (req, res) => {
    const { title } = req.body;
    if (title !== undefined) {
        Category.create({
            title,
            slug: slugify(title),  // "Computação e informatica" => "computacao-e-informatica"
        }).then(() => {
            res.redirect('/admin/categories')
        })
    } else {
        res.redirect('/admin/categories/new')
    }
});

//pegando dados do banco passando para front-end
router.get('/admin/categories', adminAuth, (req, res) => {
    Category.findAll().then(categories => {

        res.render('admin/categories/index', { categories: categories });
    });

});

//deletando dados do bando
router.post('/categories/delete', adminAuth, (req, res) => {
    const { id } = req.body;
    if (id !== undefined) { //diferente de nulo
        if (!isNaN(id)) { //For numero
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            })

        } else {
            res.redirect('/admin/categories');
        }
    } else { //NULL
        res.redirect('/admin/categories');

    }
});

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.redirect("/admin/categories");
    }
    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render('admin/categories/edit', { category: category });

        } else {
            res.redirect("/admin/categories");
        }

    }).catch(erro => {
        res.redirect("/admin/categories");
    })

});

router.post("/categories/update", adminAuth, (req, res) => {
    const { id } = req.body; //pegando id
    const { title } = req.body;

    Category.update({ title: title, slug: slugify(title), }, {
        where: { id: id }
    }).then(() => {
        res.redirect("/admin/categories");
    });
});

module.exports = router;