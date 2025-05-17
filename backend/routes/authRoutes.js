import express from 'express';
import {adminlogin, login} from '../controllers/authController.js';
import { verifyAdminAccess, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/adminlogin',adminlogin);
router.post('/verifytoken',verifyToken);
router.post('/verifyadmintoken',verifyAdminAccess);

export default router;