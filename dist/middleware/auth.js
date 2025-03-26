"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticateUser = void 0;
const jwt_1 = require("../utils/jwt");
const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Authorization token required' });
            return; // Stop execution here
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = (0, jwt_1.verifyToken)(token);
        // Attach user info to the request
        req.user = decodedToken;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return; // Stop execution here
    }
};
exports.authenticateUser = authenticateUser;
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ error: 'Access denied. Admin privileges required' });
    }
};
exports.authorizeAdmin = authorizeAdmin;
