import { Router } from 'express';
import { validateDto } from '@middlewares/validate-dto.middleware';
import { register, verifyAccount } from './auth.controller';
import { registerDto, VerifyUserDto } from './auth.dto';

const router = Router();

router.post('/register', validateDto(registerDto, 'body'), register);
router.post('/verify-account', validateDto(VerifyUserDto, 'body'), verifyAccount);

export default router;
