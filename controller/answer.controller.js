import AnswerModel from '../model/answer.model.js';
import ExamModel from '../model/exam.model.js';

class AnswerController {
    async getAnswers(req, res) {
        const answers = await AnswerModel.find();
        res.status(200);
        res.json(answers);
    }
    async getAnswersByExam(req, res) {
        const { studentId, examId } = req.params;
        let answers = [];
        let exam;
        if (examId) {
            answers = await AnswerModel.find({ exam: examId }).populate('option');
        } else {
            exam = await ExamModel.findOne({ studentId });
            if (exam) {
                answers = await AnswerModel.find({ exam: exam._id });
            }
        }
        res.status(200);
        res.json(answers);
    }
    async getAnswer(req, res) {
        const { id } = req.params;
        const data = await AnswerModel.findById(id);
        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async getByQuestion(req, res) {
        const { questionId, studentId } = req.params;
        try {
            const exam = await ExamModel.findOne({ studentId });
            const data = await AnswerModel.findOne({ question: questionId, exam: exam._id }).populate('option');
            
            res.status(200);
            res.json(data)
        } catch (error) {
            res.status(401);
            res.json('Error : Bad request - ', error.message)
        }
    }
    async create(req, res) {
        const { status, type, question, studentId, answer } = req.body;
        const exam = await ExamModel.findOne({ studentId });
        try {
            const result = await AnswerModel.create({ examId: exam._id, status, type, question, answer });
            
            const existing = exam.questions.find((q) => q == question);
            
            if (!existing) {
                exam.questions = [...exam.questions, question];
                exam.save();
            }

            res.status(201);
            res.send({ ...result, message: 'Answer was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting answer: ' + error.message});
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id
            await AnswerModel.findByIdAndUpdate(id, req.body);
            res.status(201);
            res.send({ message: 'OK', success: true});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in updating: ' + error.message});
        }
    }
}

export default AnswerController;