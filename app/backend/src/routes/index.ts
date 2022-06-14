import { Router } from 'express';
import loginRoutes from './loginRoutes';

const route = Router();

route.use('/login', loginRoutes);

export default route;
