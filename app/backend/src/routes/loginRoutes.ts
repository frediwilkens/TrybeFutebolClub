import { Router } from 'express';
import loginMiddleware from '../middlewares/loginMiddleware';
import UserController from '../controllers/user';
import authMiddleware from '../middlewares/authMiddleware';

const loginRoutes = Router();
const userController = new UserController();

loginRoutes.post('/', loginMiddleware, userController.login);
loginRoutes.get('/validate', authMiddleware, userController.validate);

export default loginRoutes;
