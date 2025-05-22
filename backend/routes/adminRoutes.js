import express from 'express';
import {getSubjectWisePerformance,getTopPerformers,getSemesterPerformance,addStudent,getAllStudents,getStudentById,updateStudentById,deleteStudent,addMark,updateMark,deleteMark,getSemMarksById,getSubjectsBySemesterNo,putSubjectsBySemesterNo} from '../controllers/adminController.js';
import { verifyAdminAccess } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/admin/add-student:
 *   post:
 *     summary: Add a new student
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - regno
 *               - section
 *               - semester
 *               - year
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               regno:
 *                 type: integer
 *                 example: 123456
 *               section:
 *                 type: string
 *                 example: A
 *               semester:
 *                 type: integer
 *                 example: 5
 *               year:
 *                 type: integer
 *                 example: 2025
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       201:
 *         description: Student added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student added successfully
 *                 student:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66317f5a341ec39cafd04ef3
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     regno:
 *                       type: integer
 *                       example: 123456
 *                     section:
 *                       type: string
 *                       example: A
 *                     semester:
 *                       type: integer
 *                       example: 5
 *                     year:
 *                       type: integer
 *                       example: 2025
 *                     password:
 *                       type: string
 *                       example: $2b$10$hashedPassword
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Student already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student already exists
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
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

router.get('/get-performance',verifyAdminAccess,getSemesterPerformance);
router.get('/getTop-Performers',verifyAdminAccess,getTopPerformers);
router.get('/getSubjectWisePerformance',verifyAdminAccess,getSubjectWisePerformance);


export default router;