import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Todolist } from "../models/Todolist";

export const getAllTodolist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const todos = await Todolist.find({ where: { owner: req.user } });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodolist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.body) return res.status(400).json({ message: 'Request body is missing' });
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    Todolist.create({
      title: title,
      description: description || '',
      owner: req.user
    }).save().then(() => {
      res.status(201).json({ message: 'Todolist created successfully' });
    })
  } catch (error) {
    next(error);
  }
}

export const editTodolist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { todoId } = req.params;
    if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
    const todo = (await Todolist.find({
      where: { owner: req.user, id: todoId },
    }))[0];
    if (!todo) return res.status(404).json({ message: 'Todolist not found' });
    const { title, description } = req.body;
    if (title) todo.title = title;
    if (description) todo.description = description;
    await todo.save();
    res.status(200).json({ message: 'Todolist updated successfully' });
  } catch (error) {
    next(error);
  }
}

export const deleteTodolist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { todoId } = req.params;
    if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
    const todo: Todolist = (await Todolist.find({
      where: { owner: req.user, id: todoId }
    }))[0];
    if (!todo) return res.status(404).json({ message: 'Todolist not found' });
    todo.remove().then(() => {
      res.status(200).json({ message: 'Todolist deleted successfully' });
    })
  } catch (error) {
    next(error);
  }
}