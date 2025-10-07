import "reflect-metadata";
import express from "express";
import cors from "cors";

export const App = express();

App.use(express.json());
App.use(cors());
