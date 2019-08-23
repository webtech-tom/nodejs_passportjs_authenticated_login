// siehe Passport Documentation
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Model laden
const User = require('../models/User');

module.exports = function(passport) {
        passport.use(
                new LocalStrategy(
                        {
                                usernameField: 'email',
                        },
                        (email, password, done) => {
                                // User prüfen, ob er bereits registriert wurde (über E-Mail Adresse)
                                User.findOne({
                                        // eslint-disable-next-line object-shorthand
                                        email: email,
                                }).then(user => {
                                        if (!user) {
                                                return done(null, false, {
                                                        message: 'Diese E-Mail Adresse wurde noch nicht registriert',
                                                });
                                        }

                                        // Passwort prüfen
                                        bcrypt.compare(password, user.password, (err, isMatch) => {
                                                if (err) throw err;
                                                if (isMatch) {
                                                        return done(null, user);
                                                }
                                                return done(null, false, {
                                                        message: 'Passwort falsch',
                                                });
                                        });
                                });
                        }
                )
        );
        // aus der Dokumentation unter configure=>sessions
        passport.serializeUser(function(user, done) {
                done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
                User.findById(id, function(err, user) {
                        done(err, user);
                });
        });
};
