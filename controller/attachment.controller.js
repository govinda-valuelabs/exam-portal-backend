import AttachmentModel from '../model/attachment.model.js';
import ExamModel from '../model/exam.model.js';

class AttachmentController {
    async getAttachments(req, res) {
        const attachments = await AttachmentModel.find();
        res.status(200);
        res.json(attachments);
    }
    async getAttachmentsByExam(req, res) {
        const { studentId } = req.params;
        let attachments = [];
        const exam = await ExamModel.findOne({ studentId });
        if (exam) {
            attachments = await AttachmentModel.find({ exam: exam._id });
        }
        res.status(200);
        res.json(attachments);
    }
    async getAttachment(req, res) {
        const { id } = req.params;
        const data = await AttachmentModel.findById(id);
        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async getByQuestion(req, res) {
        const { questionId, studentId } = req.params;
        try {
            const exam = await ExamModel.findOne({ studentId });
            const data = await AttachmentModel.findOne({ question: questionId, exam: exam._id }).populate('option');
            
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
            const result = await AttachmentModel.create({ examId: exam._id, status, type, question, answer });
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
            await AttachmentModel.findByIdAndUpdate(id, req.body);
            res.status(201);
            res.send({ message: 'OK', success: true});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in updating: ' + error.message});
        }
    }
}

export default AttachmentController;