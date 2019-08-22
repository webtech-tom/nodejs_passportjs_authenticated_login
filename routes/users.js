const express = require('express');

const router = express.Router();

// Login Seite
router.get('/login', (req, res) => res.send('Login'));

// Registrier Seite
router.get('/register', (req, res) => res.send('Registrieren'));

module.exports = router;
