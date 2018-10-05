module.exports = (err, req, res, next) => { /* eslint-disable-line */
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
};
