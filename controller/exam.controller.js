import ExamModel from '../model/exam.model.js';

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
    async create(req, res) {
        try {
            const data = req.body;
            const result = await ExamModel.create(data);
            res.status(201);
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