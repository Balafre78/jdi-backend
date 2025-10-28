import { Router } from 'express';

const router = Router();

router.get('/me', (req, res) => {
    res.json({
        message: "test authenticated route"
    })
});

export default router;