import { Router } from 'express';
import {
  getAllTodolist,
  createTodolist,
  editTodolist,
  deleteTodolist,
  getAllTasks,
  updateTask,
  deleteTask,
  createTask
} from "../controllers/todolist";

const router = Router();

/**
 * @route GET /todolist
 * @description Retrieves all todolist
 * @returns {Array<TodolistResponse>} 200 - List of todolist
 */
router.get('/', getAllTodolist);

/**
 * @route POST /todolist
 * @description Creates a new todolist
 * @body {CreateTodolistRequest}
 * @returns {UpdateTodolistResponse} 201 - Created todolist
 */
router.post('/', createTodolist);

/**
 * @route PATCH /todolist/:todoId
 * @description Updates an existing todolist
 * @param {string} todoId - ID of the todolist to update
 * @body {UpdateTodolistRequest} - Fields to update
 * @returns {UpdateTodolistResponse} 200 - Updated todolist
 */
router.patch('/:todoId', editTodolist);

/**
 * @route DELETE /todolist/:todoId
 * @description Deletes a todolist by its ID
 * @param {string} todoId - ID of the todolist to delete
 * @returns {UpdateTodolistResponse} 204 - Todolist deleted
 */
router.delete('/:todoId', deleteTodolist);

/**
 * @route GET /todolist/:todoId/task
 * @description Get all tasks from a todolist
 * @param {string} todoId - ID of the todolist
 * @returns {Array<TaskResponse>} 200 - List of tasks
 */
router.get('/:todoId/task', getAllTasks);

/**
 * @route POST /todolist/:todoId/task
 * @description Adds a task to a todolist
 * @param {string} todoId - ID of the todolist
 * @body {CreateTaskRequest} description - Description of the task
 * @returns {UpdateTaskResponse} 201 - Added task
 */
router.post('/:todoId/task', createTask);

/**
 * @route PATCH /todolist/:todoId/task/:taskId
 * @description Updates a task of a todolist
 * @param {string} todoId - ID of the todolist
 * @param {string} taskId - ID of the task
 * @body {UpdateTaskRequest} - Fields to update
 * @returns {UpdateTaskResponse} 200 - Updated task
 */
router.patch('/:todoId/task/:taskId', updateTask);

/**
 * @route DELETE /todolist/:todoId/task/:taskId
 * @description Deletes a task from a todolist
 * @param {string} todoId - ID of the todolist
 * @param {string} taskId - ID of the task
 * @returns {UpdateTaskResponse} 204 - Task deleted
 */
router.delete('/:todoId/task/:taskId', deleteTask);

export default router;