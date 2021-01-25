const express = require('express');
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');


//lista todos usuários
router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", { users });
    })
});

//exibir pagina de criação de usuário
router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
});

//salvar usuário
router.post("/users/create", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email } }).then((user) => {
        if (user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
                email,
                password: hash,
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            })
        } else {
            res.redirect("/admin/users/create");
        }
    })



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
            } else {
                res.redirect("/login")

            }

        } else {
            res.redirect('/login')
        }
    })

})

module.exports = router;