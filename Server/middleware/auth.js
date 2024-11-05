const jwt = require("jsonwebtoken")
equire("dotenv").config();

/// creating token

  createToken = async (id)=> {
     const token = jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn: 3 * 24 *60 *60
     })
     return token;


}


// validaing token
const auth = (req, res, next)=> {
    const token = req.headers.token || localStorage.getItem("token")

    const decodedData = jwt.verify(token, JWT_SECRET)

    if (decodedData) {
        req.UserId = decodedData.id
        next()
        console.log(req.UserId)
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
}

module.exports = {
    auth,
  
    createToken
}