const jwt = require("jsonwebtoken")
const JWT_SECRET = "SECRET"

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try{
        const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
        if(decodedValue.username){
            next();
        }
        else{
            res.status(403),json({
                msg:"not authenticated"
            })
        }
    }
    catch(e){
        res.status(403).json({
            msg:"wrong inputs"
        })
    }
}

module.exports = userMiddleware;