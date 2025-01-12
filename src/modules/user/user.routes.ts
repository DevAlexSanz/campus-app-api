import { Router } from 'express';
import { validateDto } from '@middlewares/validate-dto.middleware';
import { getAllUsers, getUserById } from './user.controller';
import { ValidateIdDto } from './user.dto';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', validateDto(ValidateIdDto, 'params'), getUserById);

export default router;
