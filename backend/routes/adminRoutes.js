import express from 'express';
import {addStudent,getStudentById,updateStudentById,deleteStudent,addMark,updateMark,deleteMark,getSemMarksById} from '../controllers/adminController.js';

const router = express.Router();

router.post('/add-student', addStudent);
router.get('/get-student/:id', getStudentById);
router.put('/update-student/:id', updateStudentById);
router.delete('/delete-student/:id',deleteStudent);

router.post('/add-marks',addMark);
router.get('/get-marks',getSemMarksById);
router.put('/update-marks',updateMark);
router.delete('/delete-marks',deleteMark);

export default router;