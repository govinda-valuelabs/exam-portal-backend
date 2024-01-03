import QuestionModel from '../model/question.model.js';
import OptionModel from '../model/option.model.js';

class QuestionController {
    async getQuestions(req, res) {
        const questions = await QuestionModel.find().populate('category');
        res.status(200);
        res.json(questions);
    }
    async getQuestion(req, res) {
        const { id } = req.params;
        const data = await QuestionModel.findById(id).populate('options');
        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async create(req, res) {
        try {
            const question = await QuestionModel.create(req.body);
            
            res.status(201);
            res.send({ ...question, message: 'Question was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting question: ' + error.message});
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
            res.status(204);
            res.send({ message: 'Question was deleted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in deleting: ' + error.message});
        }
    }
}

export default QuestionController;