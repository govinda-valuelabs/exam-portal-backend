import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import * as config from '../config/config.js';
import UserModel from '../model/user.model.js';
import StudentModel from '../model/student.model.js';

export default class Auth {
    async authenticateUser(email, password) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return { status: 404, message: 'User not found!'}
            }
            if (await compare(password, user.password)) {
                const JWT_SECRET = config.default.secret;
                const userToken = jwt.sign({
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    type: 'user'
                }, JWT_SECRET, {
                    expiresIn: '1h'
                })

                return {status: 200, token: userToken, name: user.name, email: user.email}
            } 
            return {status: 401, message: 'Invalid password'}
        } catch (error) {
            return {status: 408, message: 'Error timeout'}
        }
    }
    async verifyUserLogin(token) {
        const verifyToken = jwt.verify(token, config.default.secret);
        console.log('verifyToken ', verifyToken);
    }
    async userLogout() {
        const JWT_SECRET = config.default.secret;
        await jwt.sign({ type: 'user'}, JWT_SECRET,{ expiresIn: '0h' })
    }

    async authenticateStudent(email, password) {
        try {
            const student = await StudentModel.findOne({ email });
            if (!student) {
                return { status: 404, message: 'Student not found!'}
            }
            if (await compare(password, student.password)) {
                const JWT_SECRET = config.default.secret;
                const studentToken = jwt.sign({
                    studentId: student._id,
                    name: student.name,
                    email: student.email,
                    type: 'student'
                }, JWT_SECRET, {
                    expiresIn: '2h'
                })

                return {status: 200, token: studentToken, name: student.name, email: student.email, id: student._id}
            } 
            return {status: 401, token: '', name: '', email: '', id: '', message: 'Invalid password'}
        } catch (error) {
            return {status: 408, token: '', name: '', email: '', id: '', message: 'Error timeout'}
        }
    }
    async verifyStudentLogin(token) {
        try {
            const verifyToken = jwt.verify(token, config.default.secret);
            
            if (verifyToken) {
                return { status: 200, message: 'Authorized', data: { studentId: verifyToken.studentId, name: verifyToken.name, email: verifyToken.email } }
            }
        } catch (error) {
            return { status: 401, message: error.message, data: {} }
        }
    }
    async studentLogout() {
        const JWT_SECRET = config.default.secret;
        await jwt.sign({ type: 'student'}, JWT_SECRET,{ expiresIn: '0h' })
    }
}