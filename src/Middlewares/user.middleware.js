const jwt = require("jsonwebtoken");

const userAuth = (req,res,next)=>{
    try {
        const token = req.headers["token"];
        const check = jwt.decode(token)
        if(check?.userId){
            req.body.userId = check.userId
            next();
        }
        else{
            return res.status(401).json({
                status:false,
                message:"invalid token"
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:error.message
        })
    }
}

module.exports = {userAuth}