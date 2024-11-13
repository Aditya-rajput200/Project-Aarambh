const jwt = require("jsonwebtoken");

const AuthorizeRole = (...authRoles) => {
    return (req, res, next) => {
        // Retrieve token from headers
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json("Token is missing. Please log in again.");
        }

        try {
            // Verify the token and extract user data
            const decodeData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodeData;

            // Check if the user's role is authorized
            const userRole = decodeData.role;
            if (authRoles.includes(userRole)) {
                return next();
            } else {
                return res.status(403).json("Access restricted for this role.");
            }
        } catch (error) {
            // Handle invalid or expired token
            return res.status(401).json("Invalid token. Please log in again.");
        }
    };
};

module.exports = {
    AuthorizeRole
};


