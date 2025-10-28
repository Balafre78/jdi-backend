import "reflect-metadata";
import express from "express";
import cors from "cors";
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import todolistRoutes from './routes/todolist';
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorMiddleware } from './middlewares/errorMiddleware';

export const App = express();

App.use(express.json());
App.use(cors());

App.use('/auth', authRoutes);
App.use('/user', authMiddleware, userRoutes);
App.use('/todolist', authMiddleware, todolistRoutes);

App.use(errorMiddleware)