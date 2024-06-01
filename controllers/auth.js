const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_TOKEN;
const authModel = require("../models/auth");

const signup = async(req,res) => {
    try {
        //check email is already present START
        const { email} = req.body;
        const user = await authModel.findOne({email});
        if(user){
            return res.json({
                message : "This Email is Already Present!"
            })
        }
        //check email is already present END

        //import SALT from dcrypt NPM START
        const salt = bcrypt.genSaltSync(10);
        console.log("SALT" , salt);
        //import SALT from dcrypt NPM END

        //import hash from dcrypt NPM START
        const passwordHash = bcrypt.hashSync(req.body.password,salt);
        console.log("HASH", passwordHash);
        //import hash from dcrypt NPM END

        const data = req.body;
        const userData = new authModel({...data, password : passwordHash}); // save userData into authModel and password in hash form
        const newlyUserData = await userData.save(); // save data into mongoDB campass
        res.json({
            success : true,
            message : "SignUp successfully",
            newUserID : newlyUserData._id,
        })
    } 
    catch (error) {
        res.json({
            success : false,
            message : "Error while SignUp"
        })
    }
}


const login = async(req,res) => {
    try {
        const { email} = req.body;
        const user = await authModel.findOne({email});
        // console.log(user);
        if(!user){
            return res.json({
                message : "This Email is not found, Please SignUp First!"
            })
        }
        const isPasswordMatches = bcrypt.compareSync(req.body.password, user.password);
        // req.body.password is now type user password and user.password is user already signup that user password in DB 
        const tokenExpiry = Math.ceil(new Date().getTime() / 1_000) + 3600*24*7; // 7 days validate to token expiry 604800 = 3600(second)*24(hours)*7(days)

        const payload = {
            userID : user._id,
            name : user.name,
            exp : tokenExpiry,
        }

        const token = jwt.sign(payload,jwtSecretKey);

        if(isPasswordMatches){
            return res.json({
                message : "Login successfully",
                token,
            })
        }

        res.json({
            success : false,
            message : "Incorrect Password!"
        })
    } 
    catch (error) {
        res.json({
            success : false,
            message : "Error while Login"
        })
    }
}


const authController = {
    signup,login
}

module.exports = authController;