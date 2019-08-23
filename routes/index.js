const express = require('express');

const router = express.Router();
// Willkommen-Seite
router.get('/', (req, res) => res.render('willkommen'));

// Dashboard - bei erfolgreichem Login
router.get('/', (req, res) => res.render('dashboard'));

module.exports = router;
