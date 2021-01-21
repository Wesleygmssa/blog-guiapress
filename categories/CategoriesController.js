const express = require("express");
const router = express.Router();

router.get('/categories', (req, res) => {
    res.send('Rota de categoria')
});

router.get("/admin/categories", (req, res) => {
    res.send("Rota criar nova categoria")
});

module.exports = router;