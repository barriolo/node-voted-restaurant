import { Router } from 'express';
import votesRouter from './votes.routes';
import usersRoute from './users.routes';
import restaurantRouter from './restaurants.routes';

const routes = Router();

routes.use('/votes', votesRouter);
routes.use('/users', usersRoute);
routes.use('/restaurants', restaurantRouter);

export default routes;
