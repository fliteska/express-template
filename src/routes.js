/* eslint-disable */
const express = require('express');
const basicAuth = require('express-basic-auth');
require('express-group-routes');
const router = express.Router();

const requiresAuth = require('./middlewares/requiresAuth');

router.use(require('./middlewares/populateFromSession'));

router.group((router) => {
    router.use('/account', require('./db/account/routes'));
});

router.group('/api/v1', (router) => {
    router.use('/account', basicAuth({
        users: {
            admin: 'secret',
        },
    }), require('./db/account/routes/api'));
});

router.use(require('./middlewares/pageNotFound'));
router.use(require('./middlewares/errorHandler'));

module.exports = router;