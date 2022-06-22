import { Router } from 'express';
import loginMiddleware from '../middlewares/loginMiddleware';
import UserController from '../controllers/user';

const loginRoutes = Router();
const userController = new UserController();

loginRoutes.post('/', loginMiddleware, userController.login);
loginRoutes.get('/validate', userController.validate);

export default loginRoutes;
