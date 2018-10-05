const chalk = require('chalk');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const minifyHTML = require('express-minify-html');
const mongoose = require('mongoose');
const logger = require('morgan');
const bluebird = require('bluebird');
const path = require('path');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');

require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/express-service';

mongoose.Promise = bluebird;
mongoose.connect(mongoUrl);

const srcRoot = path.join(__dirname, 'src');
const viewsDir = path.join(srcRoot, 'views');
const publicDir = path.join(srcRoot, 'public');

const app = express();

app.locals = {
    site: {
        title: process.env.SITE_TITLE || 'Express Service',
    },
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'express',
    resave: true,
    saveUninitialized: false,
}));

app.set('views', viewsDir);
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(viewsDir, 'layouts'),
    partialsDir: path.join(viewsDir, 'partials'),
    helpers,
}));

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
    },
}));

app.use(sassMiddleware({
    src: publicDir,
    dest: publicDir,
    indentedSyntax: false,
    sourceMap: false,
}));

app.use('/', require('./src/routes'));

app.use(express.static(publicDir));

app.listen(port, () => {
    const { log } = console;
    log(chalk.cyan('[Application] ') + chalk.white(`http://localhost:${port}`));
    log(chalk.yellow('[MongoDB] ') + chalk.white(mongoUrl));
});

module.exports = app;
