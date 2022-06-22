import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.get('/', teamController.getAll);
teamRoutes.get('/:id', teamController.getById);

export default teamRoutes;
