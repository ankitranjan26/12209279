import { Router } from 'express';
import { calculateAverage } from '../controllers/averageController';

const router = Router();

router.post('/average', calculateAverage);

export default router;
