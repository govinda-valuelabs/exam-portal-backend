import FeedbackModel from '../model/feedback.model.js'

class FeedbackController {
    async getFeedbacks(req, res) {
        const feedbacks = await FeedbackModel.find().populate('student').populate('question');
        res.status(200);
        res.json(feedbacks);
    }

    async getFeedback(req, res) {
        const { id } = req.params;
        const data = await FeedbackModel.findById(id);
        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async getByQuestion(req, res) {
        const { question } = req.params;
        try {
            const feedbacks = await FeedbackModel.find({ question });
            res.status(200);
            res.json(feedbacks)
        } catch (error) {
            res.status(401);
            res.json('Error : Bad request - ', error.message)
        }
    }
    async getOneByQuestion(req, res) {
        const { question, student } = req.params;
        try {
            const feedbacks = await FeedbackModel.findOne({ question, student });
            
            res.status(200);
            res.json(feedbacks)
        } catch (error) {
            res.status(401);
            res.json('Error : Bad request - ', error.message)
        }
    }
    async create(req, res) {
        const { student, type, comment, question } = req.body;
        try {
            const result = await FeedbackModel.create(req.body);
            res.status(201);
            res.send({ ...result, message: 'Feedback was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting feedback: ' + error.message});
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id
            await FeedbackModel.findByIdAndUpdate(id, req.body);
            res.status(201);
            res.send({ message: 'OK', success: true});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in updating: ' + error.message});
        }
    }
}

export default FeedbackController;