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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// Register a new user
function registerUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(user);
            // Check if user already exists
            const existingUser = yield prisma.user.findUnique({
                where: { email: user.email },
            });
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Hash the password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, salt);
            // Create new user
            const newUser = yield prisma.user.create({
                data: {
                    email: user.email,
                    password: hashedPassword,
                    role: user.role || 'user', // Default to user if role not provided
                },
            });
            // Return user without password
            const { password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
            return userWithoutPassword;
        }
        catch (err) {
            console.log('Error registering user:', err);
            throw err;
        }
    });
}
// Login user
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find user by email
            const user = yield prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            // Compare passwords
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            // Return user without password
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        }
        catch (err) {
            console.log('Error logging in user:', err);
            throw err;
        }
    });
}
