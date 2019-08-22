const express = require('express');

const router = express.Router();

// Login Seite
router.get('/login', (req, res) => res.render('login'));

// Registrier Seite
router.get('/register', (req, res) => res.render('register'));

module.exports = router;
