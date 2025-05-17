import express from 'express';
import {adminlogin, login} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/adminlogin',adminlogin);


export default router;