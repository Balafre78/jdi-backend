import { Router } from 'express';
import {
  getAllTodolist,
  createTodolist,
  editTodolist,
  deleteTodolist
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

export default router;