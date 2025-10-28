import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = {
            id: req.user.id,
            email: req.user.email,
            username: req.user.username,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            createdAt: req.user.createdAt
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};