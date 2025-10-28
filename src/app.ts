import "reflect-metadata";
import express from "express";
import cors from "cors";
import authRoutes from './routes/auth';

export const App = express();

App.use(express.json());
App.use(cors());

App.use('/auth', authRoutes);