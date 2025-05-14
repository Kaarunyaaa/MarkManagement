import express from 'express';
import {getSgpaById,getClassPerformance,getTopPerformers,getSubjectWisePerformance} from '../controllers/studentController.js';

const router = express.Router();

router.get('/get-sgpa', getSgpaById);
router.get('/get-performance',getClassPerformance);
router.get('/getTop-Performers',getTopPerformers);
router.get('/getSubjectWisePerformance',getSubjectWisePerformance);


export default router;