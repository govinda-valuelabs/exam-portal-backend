import UserModel from '../model/user.model.js';
import bcrypt from 'bcrypt';
import * as config from '../config/config.js';
import Auth from '../middleware/auth.js';

class UserController {
    async login(req, res) {
        const auth = new Auth();
        const { userEmail, password } = req.body;
        const { status, token, name, email } = await auth.authenticateUser(userEmail, password);
        res.status(status);
        res.json({token, name, email});
    }
    async logout(req, res) {
        const auth = new Auth();
        await auth.userLogout();
        res.status(200);
        res.json({message: 'Successfully logged out'});
    }
    async getUsers(req, res) {
        const data = await UserModel.find();
        const users = [];

        data.forEach((d) => {
            users.push({
                _id: d._id,
                name: d.name,
                email: d.email
            })
        });
        
        res.status(200);
        res.json(users);
    }
    async getUser(req, res) {
        const { id } = req.params;
        const data = await UserModel.findById(id);
        if (data) {
            const user = {name: data.name, email:data.email}
            res.status(200);
            res.json(user);
        } else {
            res.status(404);
            res.json({message: 'User not found!'})
        }
    }
    async create(req, res) {
        try {
            const {name, email, password} = req.body;
            const hasPassword = await bcrypt.hash(password, config.default.salt);
            const result = await UserModel.create({name, email, password: hasPassword});
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
            await UserModel.findByIdAndUpdate(id, data);
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
            await UserModel.deleteOne({_id: id });
            res.status(201);
            res.send({ message: 'User was deleted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in deleting: ' + error.message});
        }
    }
}

export default UserController;