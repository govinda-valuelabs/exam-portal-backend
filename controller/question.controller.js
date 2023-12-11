import QuestionModel from '../model/question.model.js';

class QuestionController {
    async getQuestions(req, res) {
        const questions = await QuestionModel.find();
        res.status(200);
        res.json(questions);
    }
    async getQuestion(req, res) {
        const { id } = req.params.id;
        const data = await QuestionModel.findById(id);
        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async create(req, res) {
        try {
            const {name, email, password} = req.body;
            const hasPassword = await bcrypt.hash(password, config.default.salt);
            const result = await QuestionModel.create({name, email, password: hasPassword});
            res.status(201);
            res.send({ ...result, message: 'User was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting: ' + error.message});
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id
            await QuestionModel.findByIdAndUpdate(id, req.body);
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
            await QuestionModel.deleteOne({_id: id });
            res.status(201);
            res.send({ message: 'User was deleted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in deleting: ' + error.message});
        }
    }
}

export default QuestionController;