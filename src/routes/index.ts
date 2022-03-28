/**
 * Route mananger
 * 
 * @since 1.0.0
 * @version 1.0.0
 */

import { Router, Request, Response } from 'express';
import user from './user';
import auth from './auth';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);

export default routes;