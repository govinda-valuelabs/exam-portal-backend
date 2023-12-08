import express from 'express';
import StudentController from '../controller/student.controller.js';

const studentRouter = express.Router();
const student = new StudentController();

studentRouter.post('/login', student.login);
studentRouter.get('/logout', student.logout);
studentRouter.get('/', student.getstudents);
studentRouter.get('/:id', student.getstudent);
studentRouter.post('/', student.create);
studentRouter.patch('/', student.update);
studentRouter.delete('/:id', student.delete);

export default studentRouter;