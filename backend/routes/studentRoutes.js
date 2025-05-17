import express from 'express';
import {getSgpaById,getSemMarks} from '../controllers/studentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/get-sgpa',getSgpaById);
router.get('/getSemMarks',verifyToken,getSemMarks);


export default router;