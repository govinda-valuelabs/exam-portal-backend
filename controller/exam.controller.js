import ExamModel from '../model/exam.model.js';
import QuestionModel from '../model/question.model.js'

class ExamController {
    async getExams(req, res) {
        const exams = await ExamModel.find();
        res.status(200);
        res.json(exams);
    }
    async getExam(req, res) {
        const { id } = req.params.id;
        const data = await ExamModel.findById(id);
        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async question(req, res) {
        const { id } = req.params.questionId;
        const question = await QuestionModel.findById(id);

        if (question) {
            const data = { _id: question._id, title: question.title, options: question.options }
            res.status(200);
            res.json(data)
        }
    }
    async questions(req, res) {
        const questions = await QuestionModel.find();

        const data = [];
        questions.forEach((q) => {
            data.push({
                _id: q._id,
                title: q.title,
                options: q.options
            })
        })
        res.status(200);
        res.json({...data});
    }
    async getExamStatus(req, res) {
        try {
            const { studentId } = req.params;
            const result = await ExamModel.findOne({ studentId });
            res.status(200);
            res.json(result);
        } catch (error) {
            res.status(404);
            res.json({message: 'No exam attended by this student'});
        }
    }
    async create(req, res) {
        try {
            const { studentId } = req.body;
            let result = await ExamModel.findOne({ studentId });
            if (!result) {
                result = await ExamModel.create({ studentId });
                res.status(201);
            } else {
                res.status(200);
            }
            res.send({ ...result, message: 'Exam was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting question: ' + error.message});
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id
            await ExamModel.findByIdAndUpdate(id, req.body);
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
            await ExamModel.deleteOne({_id: id });
            res.status(201);
            res.send({ message: 'Exam was deleted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in deleting: ' + error.message});
        }
    }
}

export default ExamController;