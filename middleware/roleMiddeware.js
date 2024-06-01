const roleMiddleware = (role) => async(req,res,next) => {
    const user = req.user; // user role from DB
    console.log(user);
    console.log(role);
    if(role !== user.role){
        return res.status(403).json({
            message : "You Are Not Use This Authorization Account"
        })
    }
    next();
}

module.exports = roleMiddleware;