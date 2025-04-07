import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
        
        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    } else {
        res.status(401);
        throw new Error("Authorization header with Bearer token is required");
    }
});

export default validateToken;