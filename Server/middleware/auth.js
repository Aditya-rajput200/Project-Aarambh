const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET; 

// Creating token for user
const createToken = async (id) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60 // expires in 3 days
    });
    return token;
};

// Validating user token
const auth = async (req, res, next) => {
    const token = req.headers.token ;
    if (!token) {
        return res.status(400).json("Login data lost, please login again or token is missing");
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);

        if (decodedData) {
            req.UserId = {
                id: decodedData.id,
                role: decodedData.role
            };
          
            next();
        } else {
            res.status(403).json({
                message: "Invalid Credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Token verification failed",
            error: error.message
        });
    }
};

module.exports = {
    auth,
    createToken
};
