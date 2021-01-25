const express = require('express');
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');
const adminAuth = require('../middlewares/adminAuth');



//lista todos usuários
router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", { users });
    })
});

//exibir pagina de criação de usuário
router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create")
});

//salvar usuário
router.post("/users/create", adminAuth, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email } }).then((user) => {
        if (user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
                email,
                password: hash,
            }).then(() => {
                res.redirect("/admin/users");
            }).catch((err) => {
                res.redirect("/");
            })
        } else {
            res.redirect("/admin/users/create");
        }
    })



});

//deletando dados do bando
router.post('/user/delete', adminAuth, (req, res) => {
    const { id } = req.body;
    if (id !== undefined) { //diferente de nulo
        if (!isNaN(id)) { //For numero
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/users');
            })

        } else {
            res.redirect('/admin/users');
        }
    } else { //NULL
        res.redirect('/admin/users');

    }
});

//exibir pagina de login
router.get("/login", (req, res) => {
    res.render("admin/users/login");
})

//fazer login
router.post("/authenticate", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email: email } }).then(user => {
        if (user != undefined) {
            //validar senha
            let correct = bcrypt.compareSync(password, user.password); // comparação de senha

            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles');
            } else {
                res.redirect("/login")

            }

        } else {
            res.redirect('/login')
        }
    })

});


router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/login');
})

module.exports = router;