import express from 'express';
import {addStudent} from '../controllers/adminController.js';

const router = express.Router();

router.post('/add-student', addStudent);
//router.put('/update-student',updateStudent);

export default router;