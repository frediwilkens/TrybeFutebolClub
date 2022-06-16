import { Router } from 'express';
import loginRoutes from './loginRoutes';
import teamRoutes from './teamRoutes';

const route = Router();

route.use('/login', loginRoutes);
route.use('/teams', teamRoutes);

export default route;
