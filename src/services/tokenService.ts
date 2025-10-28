import jwt from "jsonwebtoken";
import { Config } from "../config/config";

export interface Payload {
    id: string;
    email: string;
    username: string;
}

export const generateToken = (user: Payload): string => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username }, Config.jwtSecret, { expiresIn: '1h' });
}

export const verifyToken = (token: string): Payload => {
    return jwt.verify(token, Config.jwtSecret) as Payload;
}