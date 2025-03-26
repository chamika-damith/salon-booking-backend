import jwt from 'jsonwebtoken';
import {UserModel} from "../models/UserModel";

export const generateToken = (user: UserModel): string => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1d' // Token expires in 1 day
    });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
        throw new Error('Invalid token');
    }
};
