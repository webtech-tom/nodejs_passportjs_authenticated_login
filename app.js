const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
// require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Verbindung zu MongoDB
mongoose.connect(db, {
        useNewUrlParser: true,
})
        .then(() => console.log('MongoDB Verbunden'))
        .catch(err => console.log(err));

// Express body parser
app.use(
        express.urlencoded({
                extended: false,
        })
);
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
