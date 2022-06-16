import { Router } from 'express';
import loginRoutes from './loginRoutes';
import matchRoutes from './matchRoutes';
import teamRoutes from './teamRoutes';

const route = Router();

route.use('/login', loginRoutes);
route.use('/teams', teamRoutes);
route.use('/matches', matchRoutes);

export default route;
