import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../services/tokenService';
import { User } from "../models/User";
import bcrypt from "bcrypt";
import type { LoginRequest, RegisterRequest } from "../types/api";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) return res.status(400).json({ message: 'Request body is missing', error: 'badRequest' });
        const { email, password } = req.body as LoginRequest;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required', error: 'badRequest' });
        }

        const user: User = (await User.find({ where: { email: email } }))[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials', error: 'invalidCredentials' });
        }

        const token = generateToken(user);
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            },
            expiresIn: Date.now() + 3600000 // 1 hour
        });
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) return res.status(400).json({ message: 'Request body is missing', error: 'badRequest' });
        const { email, username, firstName, lastName, password } = req.body as RegisterRequest;
        if (!email || !password || !username || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields are required', error: 'badRequest' });
        }

        let user = (await User.find({ where: { email: email } }))[0];
        if (user) {
            return res.status(409).json({ message: 'Email already in use', error: 'emailAlreadyUsed' });
        }
        user = (await User.find({ where: { username: username } }))[0];
        if (user) {
            return res.status(409).json({ message: 'Username already in use', error: 'usernameAlreadyUsed' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ email: email, username: username, firstName: firstName, lastName: lastName, password: hashedPassword }).save();
        const token = generateToken(user);
        res.status(200).json({
            message: 'Register successful',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            },
            expiresIn: Date.now() + 3600000 // 1 hour
        });
    } catch (error) {
        next(error);
    }
};