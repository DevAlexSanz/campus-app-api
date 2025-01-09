import { Router } from 'express';
import { createUser, getAllUsers, getUserById } from './user.controller';
import { validateDto } from '@middlewares/validate-dto.middleware';
import { CreateUserDto, ValidateIdDto } from './user.dto';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', validateDto(ValidateIdDto, 'params'), getUserById);
router.post('/', validateDto(CreateUserDto, 'body'), createUser);

export default router;
