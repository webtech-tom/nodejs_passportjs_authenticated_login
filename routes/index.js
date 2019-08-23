const express = require('express');

const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Willkommen-Seite
router.get('/', (req, res) => res.render('willkommen'));

// Dashboard - bei erfolgreichem Login
router.get('/dashboard', ensureAuthenticated, (req, res) =>
        res.render('dashboard', {
                name: req.user.name,
        })
);

module.exports = router;
