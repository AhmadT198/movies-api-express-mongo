const jwt = require("jsonwebtoken")
const config = require('config')


function auth(req,res,next){
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Access Denied! No token provided.");


    try {
        const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"))
        req.user = decodedPayload;
        console.log(decodedPayload)
        next()

    } catch (ex) {
        res.status(400).send("Invalid Token.")
    }

}

module.exports = auth