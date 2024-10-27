const jwt = require("jsonwebtoken")
const JWT_SECRET = "abcdefgh@"

function auth(req, res, next) {
    const token = req.headers.token

    const decodedData = jwt.verify(token, JWT_SECRET)

    if (decodedData) {
        req.UserId = decodedData.id
        next()
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}