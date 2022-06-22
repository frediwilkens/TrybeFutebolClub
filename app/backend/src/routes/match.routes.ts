import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/match';
import matchMiddleware from '../middlewares/matchMiddleware';

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get('/', matchController.getAll);
matchRoutes.post('/', authMiddleware, matchMiddleware, matchController.create);
matchRoutes.patch('/:id', matchController.update);
matchRoutes.patch('/:id/finish', matchController.finish);

export default matchRoutes;
