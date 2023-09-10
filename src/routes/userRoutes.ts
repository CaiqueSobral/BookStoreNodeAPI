import { Router } from 'express';
import * as userController from '../controllers/userController.ts';

export const UserRouter = Router();

UserRouter.post('/user/register', userController.registerUser);
UserRouter.post('/user/login', userController.loginUser);
