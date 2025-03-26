import express from 'express';
import { registerUser, loginUser } from '../database/user-prisma-data-store';
import { generateToken } from '../utils/jwt';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
        }

        const newUser = await registerUser({ email, password, role: role || 'user' });

        // Generate JWT token
        const token = generateToken({
            id: newUser.id,
            email: newUser.email,
            password: '', // Not including password in the token
            role: newUser.role
        });

        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error: any) {
        if (error.message === 'User already exists') {
            res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await loginUser(email, password);

        // Generate JWT token
        const token = generateToken({
            id: user.id,
            email: user.email,
            password: '', // Not including password in the token
            role: user.role
        });

        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error: any) {
        if (error.message === 'Invalid credentials') {
            res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error logging in user' });
    }
});

export const authRoute = router;
