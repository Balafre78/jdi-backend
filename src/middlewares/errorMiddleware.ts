import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(500).json({
        message: err.message || 'Internal Server Error',
        error: 'internal'
    });
};