const express = require('express');

const router = express.Router();

// Login Seite
router.get('/login', (req, res) => res.render('login'));

// Registrier Seite
router.get('/register', (req, res) => res.render('register'));

// Register Handle

router.post('/register', (req, res) => {
        console.log(req.body);
        res.send('hallo');
});

module.exports = router;
