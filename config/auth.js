module.exports = {
        ensureAuthenticated(req, res, next) {
                if (req.isAuthenticated()) {
                        return next();
                }
                req.flash('error_msg', 'Bitte einloggen um zu dieser Seite zu gelangen');
                res.redirect('/users/login');
        },
        forwardAuthenticated(req, res, next) {
                if (!req.isAuthenticated()) {
                        return next();
                }
                res.redirect('/dashboard');
        },
};
