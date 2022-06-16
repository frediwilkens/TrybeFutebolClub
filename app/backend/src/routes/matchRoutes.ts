import { Router } from 'express';
import MatchController from '../controllers/match';

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get('/', matchController.getAll);

export default matchRoutes;
