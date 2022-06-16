import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/match';

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get('/', matchController.getAll);
matchRoutes.post('/', authMiddleware, matchController.create);

export default matchRoutes;
