const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


module.exports = async function (req, res, next) {
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try{
        
    } catch(error) {
        console.log("Error During Authorization, ", error);
        return res.status(401).json({
            message : "Ivalid or expired token, please login again"
        });
    }
}