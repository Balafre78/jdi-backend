import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Todolist } from "../models/Todolist";
import { Task } from '../models/Task';

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


export const getAllTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { todoId } = req.params;
    if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
    const todo: Todolist = (await Todolist.find({
      where: { owner: req.user, id: todoId },
      relations: { tasks: true }
    }))[0];
    if (!todo) return res.status(404).json({ message: 'Todolist not found' });
    const tasks: Task[] = todo.tasks;
    res.status(200).json(tasks.map((task: Task) => {
      return {
        id: task.id,
        name: task.name,
        description: task.description,
        status: task.status,
      }
    }));
  } catch (error) {
    next(error);
  }
}

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { todoId } = req.params;
    if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
    if (!req.body) return res.status(400).json({ message: 'Request body is missing' });
    const { name, description } = req.body;
    const todo: Todolist = (await Todolist.find({
      where: { owner: req.user, id: todoId },
      relations: { tasks: true }
    }))[0];
    if (!todo) return res.status(404).json({ message: 'Todolist not found' });
    Task.create({
      name: name,
      description: description || '',
      todolist: todo
    }).save().then(() => {
      res.status(201).json({ message: 'Task created successfully' });
    })
  } catch (error) {
    next(error);
  }
}

export const editTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { todoId, taskId } = req.params;
    if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
    if (!taskId) return res.status(400).json({ message: 'Task ID is missing' });
    const todo: Todolist = (await Todolist.find({
      where: { owner: req.user, id: todoId },
      relations: { tasks: true }
    }))[0];
    if (!todo) return res.status(404).json({ message: 'Todolist not found' });
    const task = todo.tasks.find((task: Task) => task.id === todoId);
    if (!task) return res.status(404).json({ message: 'Unknown task' });
    task.remove().then(() => {
      res.status(200).json({ message: 'Task deleted successfully' });
    })
  } catch (error) {
    next(error);
  }
}

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { todoId, taskId } = req.params;
    if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
    if (!taskId) return res.status(400).json({ message: 'Task ID is missing' });

  } catch (error) {
    next(error);
  }
}