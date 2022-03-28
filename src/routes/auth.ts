/**
 * Auth managment routes
 * 
 * @since 1.0.0
 * @version 1.0.0
 */
import { Router } from 'express';
import AuthController from '../controllers/auth';

const router = Router();
const auth = new AuthController();

router.post('/login', auth.login);
router.post('/forgot-password', auth.forgotPassword);

export default router;