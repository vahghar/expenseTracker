const jwt = require("jsonwebtoken");

const isAuthenticated = async(req,next) =>{

    //get the token from the header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(' ')[1];
    
    //verify the token
    const verifyToken = jwt.verify(token,'bihariKey',(err,decoded)=>{
        if(err){
            return false;
        }else{
            return decoded;
        }
    });
    
    if(verifyToken){
        //save user req object
        req.user = verifyToken.id;
        next();
    }else{
        const err = new Error("token expired, login again");
        next(err);
    }
    
};

module.exports = isAuthenticated;