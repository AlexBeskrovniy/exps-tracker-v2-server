import express from 'express';
import { registerUser, loginUser, checkAuth } from '../controllers/userController.mjs';
import { auth } from '../middleware/auth.mjs';

const router = express.Router();

router
    .get('/api/user', auth, checkAuth)
    .post('/api/user/create', registerUser)
    .post('/api/user/login', loginUser);

export default router;