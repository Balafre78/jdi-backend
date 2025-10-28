import jwt from "jsonwebtoken";
import { User } from "../types/api";
import { Config } from "../config/config";

export const generateToken = (user: User): string => {
    return jwt.sign({ email: user.email, username: user.username }, Config.jwtSecret, { expiresIn: '1h' });
}