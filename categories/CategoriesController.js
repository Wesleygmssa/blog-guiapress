const express = require("express");
const router = express.Router();
const category = require('./Category');
const slugify = require('slugify');


router.get("/admin/categories/new", (req, res) => {
    res.render('admin/categories/new');
});


//Salvando dados no bando
router.post("/categories/save", (req, res) => {
    const { title } = req.body;
    if (title !== undefined) {
        category.create({
            title,
            slug: slugify(title),  // "Computação e informatica" => "computacao-e-informatica"
        }).then(() => {
            res.redirect('/')
        })
    } else {
        res.redirect('/admin/categories/new')
    }
});

router.get('/admin/categories', (req, res) => {
    category.findAll().then(categories => {

        res.render('admin/categories/index', { categories: categories });
    });

});

router.post('/categories/delete', (req, res) => {
    const { id } = req.body;
    if (id !== undefined) { //diferente de nulo
        if (!isNaN(id)) { //For numero

            category.destroy({
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

module.exports = router;