const jwt = require("jsonwebtoken");

const adminAuth = (req,res,next)=>{
    try {
        const token = req.headers["token"];
        const check = jwt.decode(token)
        if(check?.role == 'admin'){
            next();
        }
        else{
            return res.status(401).json({
                status:false,
                message:"not authorized"
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:error.message
        })
    }
}

module.exports = {adminAuth}