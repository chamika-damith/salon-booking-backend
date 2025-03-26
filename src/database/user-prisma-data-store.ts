import { PrismaClient } from '@prisma/client';
import {UserModel} from "../models/UserModel";
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

// Register a new user
export async function registerUser(user: Omit<UserModel, 'id'>) {
    try {
        console.log(user);
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                role: user.role || 'user', // Default to user if role not provided
            },
        });

        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    } catch (err) {
        console.log('Error registering user:', err);
        throw err;
    }
}

// Login user
export async function loginUser(email: string, password: string) {
    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (err) {
        console.log('Error logging in user:', err);
        throw err;
    }
}