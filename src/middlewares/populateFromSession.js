module.exports = (req, res, next) => {
    if (req.session.accountId) {
        res.locals.accountId = req.session.accountId;
    }
    next();
};
