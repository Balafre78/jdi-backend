import { Router } from 'express';
import {
  getAllTodolist,
  createTodolist,
  editTodolist,
  deleteTodolist,
  getAllTasks,
  editTask,
  deleteTask,
  createTask
} from "../controllers/todolist";

const router = Router();

/**
 * @route GET /todolist
 * @description Retrieves all todos
 * @returns {Array<TodoList>} 200 - List of todos
 */
router.get('/', getAllTodolist);

/**
 * @route POST /todolist
 * @description Creates a new todolist
 * @body {string} title - Title of the todolist
 * @returns {TodoList} 201 - Created todolist
 */
router.post('/', createTodolist);

/**
 * @route PATCH /todolist/:todoId
 * @description Updates an existing todolist
 * @param {string} todoId - ID of the todolist to update
 * @body {Partial<TodoList>} - Fields to update
 * @returns 200 - Updated todo
 */
router.patch('/:todoId', editTodolist);

/**
 * @route DELETE /todolist/:todoId
 * @description Deletes a todolist by its ID
 * @param {string} todoId - ID of the todolist to delete
 * @returns 204 - Todolist deleted
 */
router.delete('/:todoId', deleteTodolist);

/**
 * @route GET /todolist/:todoId/task
 * @description Get all tasks from a todolist
 * @param {string} todoId - ID of the todolist
 * @returns {Task} 201 - Added task
 */
router.get('/:todoId/task', getAllTasks);

/**
 * @route POST /todolist/:todoId/task
 * @description Adds a task to a todolist
 * @param {string} todoId - ID of the todolist
 * @body {string} description - Description of the task
 * @returns {Task} 201 - Added task
 */
router.post('/:todoId/task', createTask);

/**
 * @route PATCH /todolist/:todoId/task/:taskId
 * @description Updates a task of a todolist
 * @param {string} todoId - ID of the todolist
 * @param {string} taskId - ID of the task
 * @body {Partial<Task>} - Fields to update
 * @returns {Task} 200 - Updated task
 */
router.patch('/:todoId/task/:taskId', editTask);

/**
 * @route DELETE /todolist/:todoId/task/:taskId
 * @description Deletes a task from a todolist
 * @param {string} todoId - ID of the todolist
 * @param {string} taskId - ID of the task
 * @returns {void} 204 - Task deleted
 */
router.delete('/:todoId/task/:taskId', deleteTask);

export default router;