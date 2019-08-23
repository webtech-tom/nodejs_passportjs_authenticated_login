const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

// User Model
const User = require('../models/User');
// Login Seite
router.get('/login', (req, res) => res.render('login'));

// Registrier Seite
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
        const { name, email, password, password2 } = req.body;
        const errors = [];

        // Felder prüfen, ob Forms gefüllt
        if (!name || !email || !password || !password2) {
                errors.push({
                        msg: 'Bitte alle Felder ausfüllen',
                });
        }

        // Checken, ob Passwörter gleich sind
        if (password != password2) {
                errors.push({
                        msg: 'Passwörter stimmen nicht überein',
                });
        }

        if (password.length < 6) {
                errors.push({
                        msg: 'Passwort muss mindestens 6 Zeichen umfassen',
                });
        }

        if (errors.length > 0) {
                res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                });
        } else {
                // Ist die E-Mail bereits registriert?
                User.findOne({
                        email,
                }).then(user => {
                        // Benutzer bereits registriert
                        if (user) {
                                // Error Message
                                errors.push({
                                        msg: 'E-Mail wurde bereits registriert',
                                });
                                res.render('register', {
                                        errors,
                                        name,
                                        email,
                                        password,
                                        password2,
                                });
                        } else {
                                const newUser = new User({
                                        name,
                                        email,
                                        password,
                                });
                                // Passwort Hashen mit Bcrypt (aus Bcrypt Dokumentation)
                                bcrypt.genSalt(10, (err, salt) => {
                                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                                                if (err) throw err;
                                                // Passwort wurde gehasht
                                                newUser.password = hash;
                                                // Benutzer speichern
                                                newUser.save()
                                                        .then(user => {
                                                                // wenn erfolgreich, dann Erfolgsnachricht und redirecten zu login Seite
                                                                req.flash(
                                                                        'success_msg',
                                                                        'Erfolgreich registriert. Du kannst dich nun einloggen'
                                                                );
                                                                res.redirect('/users/login');
                                                        })
                                                        // Falls fehler dann Error message
                                                        .catch(err => console.log(err));
                                        });
                                });
                        }
                });
        }
});

// Login Handler, damit beim Login die Lokale Strategie genutzt wird, siehe auch Documentation unter "Custom Callback"
router.post('/login', (req, res, next) => {
        passport.authenticate('local', {
                successRedirect: '/dashboard',
                failureRedirect: '/users/login',
                failureFlash: true,
        })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
        req.logout();
        req.flash('success_msg', 'Ausgeloggt');
        res.redirect('/users/login');
});

module.exports = router;
