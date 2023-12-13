import StudentModel from '../model/student.model.js';
import bcrypt from 'bcrypt';
import * as config from '../config/config.js';
import Auth from '../middleware/auth.js';

class StudentController {
    async login(req, res) {
        const auth = new Auth();
        const { studentEmail, password } = req.body;
        const { status, token, name, email, id } = await auth.authenticateStudent(studentEmail, password);
        res.status(status);
        res.json({token, name, email, id});
    }
    async isLogged(req, res) {
        const auth = new Auth();
        const { token } = req.body;
        const { status, message, data } = await auth.verifyStudentLogin(token);
        res.status(status);
        res.json({ message, ...data });
    }
    async logout(req, res) {
        const auth = new Auth();
        await auth.studentLogout();
        res.status(200);
        res.json({message: 'Successfully logged out'});
    }
    async getStudents(req, res) {
        const data = await StudentModel.find();
        const students = [];

        data.forEach((d) => {
            students.push({
                _id: d._id,
                name: d.name,
                email: d.email
            })
        });
        res.status(200);
        res.json(students);
    }
    async getStudent(req, res) {
        try {
            const { id } = req.params;
            const data = await StudentModel.findById(id);
            if (data) {
                const student = {name: data.name, email:data.email}
                res.status(200);
                res.json(student);
            } else {
                res.status(404);
                res.json({message: 'Student not found!'})
            }
        } catch (error) {
            res.status(404);
            res.json({message: 'Student not found!'})
        }
    }
    async create(req, res) {
        try {
            const {name, email, password} = req.body;
            const hasPassword = await bcrypt.hash(password, config.default.salt);
            const result = await StudentModel.create({name, email, password: hasPassword});
            res.status(201);
            res.send({ ...result, message: 'User was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting: ' + error.message});
        }
    }
    async update(req, res) {
        try {
            const {name, email, password} = req.body;
            const data = {name, email};
            
            if (password) {
                const hasPassword = await bcrypt.hash(password, config.default.salt);
                data['password'] = hasPassword;
            }

            const id = req.params.id
            await StudentModel.findByIdAndUpdate(id, data);
            res.status(201);
            res.send({ message: 'OK', success: true});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in updating: ' + error.message});
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            await StudentModel.deleteOne({_id: id });
            res.status(204);
            res.send({ message: 'User was deleted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in deleting: ' + error.message});
        }
    }
}

export default StudentController;