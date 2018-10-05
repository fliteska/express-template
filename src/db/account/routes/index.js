const express = require('express');

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('account/create');
});

router.get('/login', (req, res) => {
    res.render('account/login');
});

module.exports = router;
