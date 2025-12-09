import jwt from "jsonwebtoken";
import { Config } from "../config/config";

export interface Payload {
    id: string;
    email: string;
    username: string;
}

export const generateToken = (user: Payload): string => {
    // Sign the JWT with a payload containing the user's id, email, and username. Set the token to expire in 1 hour.
    return jwt.sign({ id: user.id, email: user.email, username: user.username }, Config.jwtSecret, { expiresIn: '1h' });
}

export const verifyToken = (token: string): Payload => {
    // Verify the JWT and return the decoded payload if valid. Throw an error if invalid or expired.
    return jwt.verify(token, Config.jwtSecret) as Payload;
}