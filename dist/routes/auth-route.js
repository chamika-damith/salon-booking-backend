"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_prisma_data_store_1 = require("../database/user-prisma-data-store");
const jwt_1 = require("../utils/jwt");
const router = express_1.default.Router();
// Register a new user
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
        }
        const newUser = yield (0, user_prisma_data_store_1.registerUser)({ email, password, role: role || 'admin' });
        // Generate JWT token
        const token = (0, jwt_1.generateToken)({
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
    }
    catch (error) {
        if (error.message === 'User already exists') {
            res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error registering user' });
    }
}));
// Login user
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
        }
        const user = yield (0, user_prisma_data_store_1.loginUser)(email, password);
        // Generate JWT token
        const token = (0, jwt_1.generateToken)({
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
    }
    catch (error) {
        if (error.message === 'Invalid credentials') {
            res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error logging in user' });
    }
}));
exports.authRoute = router;
