import express from 'express';
import { whoami } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/me', authenticate, whoami);

export default router;
