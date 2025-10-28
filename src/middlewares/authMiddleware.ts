import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { type Payload, verifyToken } from "../services/tokenService";

export interface AuthRequest extends Request {
    user: User;
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded: Payload = verifyToken(token);
        const user = (await User.find({ where: { id: decoded.id } }))[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Should not happen
        }
        (req as AuthRequest).user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

