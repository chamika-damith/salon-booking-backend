// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Authorization token required' });
            return; // Stop execution here
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = verifyToken(token);

        // Attach user info to the request
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return; // Stop execution here
    }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Admin privileges required' });
    }
};
