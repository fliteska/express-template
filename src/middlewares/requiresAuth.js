module.exports = (req, res, next) => {
    if (req.session && req.session.account) {
        return next();
    }
    req.session.redirectUrl = req.path;
    return res.redirect('/login');
};
