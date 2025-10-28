import "reflect-metadata";
import express from "express";
import cors from "cors";
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import { authMiddleware } from "./middlewares/authMiddleware";

export const App = express();

App.use(express.json());
App.use(cors());

App.use('/auth', authRoutes);
App.use('/user', authMiddleware, userRoutes)
