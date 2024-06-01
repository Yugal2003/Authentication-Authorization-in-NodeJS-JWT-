const jwt = require("jsonwebtoken");
const jwtSecretKey = "MY_JWT_SECRET_KEY123";
const authModel = require("../models/auth");

const validateUser = async (req,res,next) => {
    const headers = req.headers;
    const tokenFromHeaders = headers.authorization.split(" ")[1];
    // console.log(headers);

    /**
   * Points to be validated in token
   * 1. Token should be present
   * 2. Secret key validation (This is the same tokne that we have generated)
   * 3. Token expiry date should not be passed
   * 4. Validate the issued at date (Optional)
   * 5. Validate the user id if it is present in database
   */

    // first point start
    //Note : user only write an bearer not an pass token so we write an this message
    if(!tokenFromHeaders){
        return res.status(401).json({
            message : "Token Not Present"
        });
    }
    // first point end
    // second point start
    try {
        jwt.verify(tokenFromHeaders,jwtSecretKey);    
    } 
    catch (error) {
        return res.status(401).json({
            message : "Token Not Found in Database"
        })
    }    
    // second point end

    // third point start
    const tokenPayloadData = jwt.decode(tokenFromHeaders); // this is provide an payload part
    console.log(tokenPayloadData);
    const tokenExpTime = tokenPayloadData.exp;
    const nowTime = Math.ceil(new Date().getTime() / 1_000);

    if(tokenExpTime < nowTime){
        return res.status(401).json({
            message : "User Token Expiry"
        })
    }
    // third point end

    // four point end
    // const tokenStartTime = tokenPayloadData.iat;
    // const nowTimes = Math.ceil(new Date().getTime() / 1_000);

    // if(tokenStartTime < nowTimes){
    //     return res.status(401).json({
    //         message : "Unauthorize User"
    //     })
    // }
    // four point end

    // fifth point end
    const userId = tokenPayloadData.userID;
    // console.log(userId);
    const user = await authModel.findById(userId);

    if(!user){
        return res.status(401).json({
            message : "Unauthorize UserId Not Found"
        });
    }
    // fifth point end
    req.user = user;
    next();
}


module.exports = validateUser;