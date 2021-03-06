const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Verbindung zu MongoDB
mongoose.connect(db, {
        useNewUrlParser: true,
})
        .then(() => console.log('MongoDB Verbunden'))
        .catch(err => console.log(err));

// Express Bodyparser
app.use(
        express.urlencoded({
                extended: false,
        })
);
// Express session aus Dokumentation von Express Github Documentation
app.use(
        session({
                secret: 'secret',
                resave: true,
                saveUninitialized: true,
        })
);

// PassportJS middleware aus Documentation unter "Configure", Muss nach Express Session
app.use(passport.initialize());
app.use(passport.session());

// Flash Funktion für z.B. erfolgsmessage, wenn neu registriert
app.use(flash());

// Globale Variablen für die aufpopenden Nachrichten (von Bootstrap), werden in messages.ejs erstellt
app.use(function(req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
});

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server gestartet auf Port ${PORT}`));
