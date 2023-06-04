function protect(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else {
        req.session.returnTo = req.originalUrl
        res.redirect('/user/login')
    }
}

module.exports = {protect}