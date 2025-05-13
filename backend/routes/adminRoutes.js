import express from 'express';
import {addStudent,getStudentById,updateStudentById} from '../controllers/adminController.js';

const router = express.Router();

router.post('/add-student', addStudent);
router.get('/get-student/:id', getStudentById);
router.put('/update-student/:id', updateStudentById);

export default router;