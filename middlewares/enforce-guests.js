module.exports = (req, res, next) => {
    console.log('in enforce guest');
    if (!(req.user)) {
        return next();
    }
    res.redirect('/dashboard');
}