import express from 'express';
import {getSubjectWisePerformance,getTopPerformers,getClassPerformance,addStudent,getAllStudents,getStudentById,updateStudentById,deleteStudent,addMark,updateMark,deleteMark,getSemMarksById,getSubjectsBySemesterNo,putSubjectsBySemesterNo} from '../controllers/adminController.js';
import { verifyAdminAccess } from '../middleware/auth.js';

const router = express.Router();

router.post('/add-student',verifyAdminAccess, addStudent);
router.get('/get-all-student/:semester',verifyAdminAccess, getAllStudents);
router.get('/get-student/:id',verifyAdminAccess, getStudentById);
router.put('/update-student/:id',verifyAdminAccess, updateStudentById);
router.delete('/delete-student/:id',verifyAdminAccess,deleteStudent);

router.post('/add-marks',verifyAdminAccess,addMark);
router.get('/get-marks',verifyAdminAccess, getSemMarksById);
router.put('/update-marks',verifyAdminAccess,updateMark);
router.delete('/delete-marks',verifyAdminAccess,deleteMark);

router.get('/get-subject-bySemNo',verifyAdminAccess,getSubjectsBySemesterNo);
router.post('/add-subject',verifyAdminAccess,putSubjectsBySemesterNo);

router.get('/get-performance',verifyAdminAccess,getClassPerformance);
router.get('/getTop-Performers',verifyAdminAccess,getTopPerformers);
router.get('/getSubjectWisePerformance',verifyAdminAccess,getSubjectWisePerformance);


export default router;