import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchController from '../controllers/match.controller';
import matchMiddleware from '../middlewares/match.middleware';

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get('/', matchController.getAll);
matchRoutes.post('/', authMiddleware, matchMiddleware, matchController.create);
matchRoutes.patch('/:id', matchController.update);
matchRoutes.patch('/:id/finish', matchController.finish);

export default matchRoutes;
