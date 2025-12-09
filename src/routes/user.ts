import { Router } from 'express';
import { getMe } from '../controllers/user';

const router = Router();

/**
 * @route GET /user/me
 * @description Retrieves the authenticated user's information
 * @returns {UserResponse} 200 - Authenticated user's data
 */
router.get('/me', getMe);

export default router;