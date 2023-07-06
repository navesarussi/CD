module.exports = (req,res,next) => {
    console.log("in enforcer authorization");
    if(req.user){
        return next();
    }
    res.redirect('/welcome');
}