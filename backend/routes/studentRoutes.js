import express from 'express';
import {getSgpaById,getSemMarks,getClassPerformance,getTopPerformers,getSubjectWisePerformance} from '../controllers/studentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/get-sgpa',verifyToken, getSgpaById);
router.get('/get-performance',verifyToken,getClassPerformance);
router.get('/getTop-Performers',verifyToken,getTopPerformers);
router.get('/getSubjectWisePerformance',verifyToken,getSubjectWisePerformance);
router.get('/getSemMarks',verifyToken,getSemMarks);


export default router;