import { Router } from 'express';
import { getMe } from '../controllers/user';

const router = Router();

router.get('/me', getMe);

export default router;