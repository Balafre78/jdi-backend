import { Router } from 'express';
import { login, register } from '../controllers/auth';

const router = Router();

/**
 * @route POST /auth/login
 * @description Authenticates a user and returns a token
 * @body {LoginRequest} - User credentials
 * @returns {AuthResponse} 200 - Authentication token
 */
router.post('/login', login);

/**
 * @route POST /auth/register
 * @description Registers a new user
 * @body {RegisterRequest} - New user details
 * @returns {AuthResponse} 201 - Authentication token for the new user
 */
router.post('/register', register);

export default router;