import { Router } from 'express';
import moduleRoutes from '@modules/module.routes';

const router = Router();

router.use('/modules', moduleRoutes);

export default router;
