import express from 'express';
import {addStudent,getAllStudents,getStudentById,updateStudentById,deleteStudent,addMark,updateMark,deleteMark,getSemMarksById,getSubjectsBySemesterNo,putSubjectsBySemesterNo} from '../controllers/adminController.js';

const router = express.Router();

router.post('/add-student', addStudent);
router.get('/get-all-student/:semester', getAllStudents);
router.get('/get-student/:id', getStudentById);
router.put('/update-student/:id', updateStudentById);
router.delete('/delete-student/:id',deleteStudent);

router.post('/add-marks',addMark);
router.get('/get-marks',getSemMarksById);
router.put('/update-marks',updateMark);
router.delete('/delete-marks',deleteMark);

router.get('/get-subject-bySemNo',getSubjectsBySemesterNo);
router.post('/add-subject',putSubjectsBySemesterNo);

export default router;