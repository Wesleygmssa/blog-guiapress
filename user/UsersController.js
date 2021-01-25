const express = require('express');
const router = express.Router();
const User = require("./User");


router.get("/admin/users", (req, res) => {
    //listagem de usuários
});


router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
});

router.post("/users/create", (req, res) => {
    const { email, password } = req.body;

})

module.exports = router;