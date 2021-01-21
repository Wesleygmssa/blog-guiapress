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

module.exports = router;