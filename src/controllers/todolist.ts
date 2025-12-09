import {NextFunction, Response} from "express";
import {AuthRequest} from "../middlewares/authMiddleware";
import {Todolist} from "../models/Todolist";
import {Task} from '../models/Task';
import {CreateTaskRequest, TaskStatus, UpdateTaskRequest} from "../types/api";

export const getAllTodolist = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Fetch all todolists for the authenticated user
        const todos = await Todolist.find({ where: { owner: req.user } });
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

export const createTodolist = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Checking body validity
        if (!req.body) return res.status(400).json({ message: 'Request body is missing' });
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Create new todolist and send response
        Todolist.create({
            title: title,
            description: description || '',
            owner: req.user
        }).save().then(() => {
            res.status(201).json({ message: 'Todolist created successfully' });
        });
    } catch (error) {
        next(error);
    }
}

export const editTodolist = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Fetch todolist by ID if exists and belongs to the user
        const { todoId } = req.params;
        if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
        const todo = (await Todolist.find({
            where: { owner: req.user, id: todoId },
        }))[0];
        if (!todo) return res.status(404).json({ message: 'Todolist not found' });

        // Update fields if provided
        const { title, description, archived } = req.body;
        if (title) todo.title = title;
        if (description) todo.description = description;
        if (archived !== undefined) todo.archived = archived;

        // Save changes and send response
        await todo.save();
        res.status(200).json({ message: 'Todolist updated successfully' });
    } catch (error) {
        next(error);
    }
}

export const deleteTodolist = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Checking param validity
        const { todoId } = req.params;
        if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });

        // Fetch todolist by ID if exists and belongs to the user
        const todo: Todolist = (await Todolist.find({
            where: { owner: req.user, id: todoId }
        }))[0];
        if (!todo) return res.status(404).json({ message: 'Todolist not found' });

        // Delete todolist and send response
        todo.remove().then(() => {
            res.status(204).json({ message: 'Todolist deleted successfully' });
        })
    } catch (error) {
        next(error);
    }
}


export const getAllTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Checking param validity
        const { todoId } = req.params;
        if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });

        // Fetch todolist by ID if exists and belongs to the user
        const todo: Todolist = (await Todolist.find({
            where: { owner: req.user, id: todoId },
            relations: { tasks: true }
        }))[0];
        if (!todo) return res.status(404).json({ message: 'Todolist not found' });

        // Fetch tasks and send response
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
        // Checking param validity
        const { todoId } = req.params;
        if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });

        // Checking body validity
        if (!req.body) return res.status(400).json({ message: 'Request body is missing' });
        const { name, description } = req.body as CreateTaskRequest;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Fetch todolist by ID if exists and belongs to the user
        const todo: Todolist = (await Todolist.find({
            where: { owner: req.user, id: todoId },
            relations: { tasks: true }
        }))[0];
        if (!todo) return res.status(404).json({ message: 'Todolist not found' });

        // Create new task and send response
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

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Checking param validity
        const { todoId, taskId } = req.params;
        if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
        if (!taskId) return res.status(400).json({ message: 'Task ID is missing' });

        // Fetch todolist by ID if exists and belongs to the user
        const todo: Todolist = (await Todolist.find({
            where: {owner: req.user, id: todoId},
            relations: {tasks: true}
        }))[0];
        if (!todo) return res.status(404).json({ message: 'Todolist not found' });

        // Find task the task by ID if exists
        const task = todo.tasks.find((task: Task) => task.id == taskId);
        if (!task) return res.status(404).json({ message: 'Unknown task' });

        // Delete task and send response
        task.remove().then(() => {
            res.status(204).json({ message: 'Task deleted successfully' });
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Checking param validity
        const { todoId, taskId } = req.params;
        if (!todoId) return res.status(400).json({ message: 'Todolist ID is missing' });
        if (!taskId) return res.status(400).json({ message: 'Task ID is missing' });

        // Checking body validity
        const { name, description, status } = req.body as UpdateTaskRequest;

        // Fetch todolist by ID if exists and belongs to the user
        const todo: Todolist = (await Todolist.find({
            where: { owner: req.user, id: todoId },
            relations: { tasks: true }
        }))[0];
        if (!todo) return res.status(404).json({ message: 'Todolist not found' });

        // Find task the task by ID if exists
        const task = todo.tasks.find((task: Task) => task.id == taskId);
        if (!task) return res.status(404).json({ message: 'Unknown task' });

        // Update fields if provided
        if (name) task.name = name;
        if (description) task.description = description;
        if (status) task.status = status;

        // Save changes and send response
        await task.save();
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        next(error);
    }
}