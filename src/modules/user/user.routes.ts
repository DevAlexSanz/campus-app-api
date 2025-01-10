import { Router } from 'express';
import { validateDto } from '@middlewares/validate-dto.middleware';
import {
  registerUser,
  getAllUsers,
  getUserById,
  verifyUser,
} from './user.controller';
import { LoginUserDto, ValidateIdDto, VerifyUserDto } from './user.dto';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', validateDto(ValidateIdDto, 'params'), getUserById);
router.post('/register', validateDto(LoginUserDto, 'body'), registerUser);
router.post('/verify-user', validateDto(VerifyUserDto, 'body'), verifyUser);

export default router;
