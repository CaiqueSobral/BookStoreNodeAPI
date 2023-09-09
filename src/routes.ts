import { Router } from 'express';
import { bookRouter } from './routes/bookRoutes';
import { UserRouter } from './routes/userRoutes';
import { reviewRouter } from './routes/reviewRoutes';

export const router = Router();

router.use('', bookRouter);
router.use('', UserRouter);
router.use('', reviewRouter);
