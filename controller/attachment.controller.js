import AttachmentModel from '../model/attachment.model.js';
import ExamModel from '../model/exam.model.js';

class AttachmentController {
    async getAttachments(req, res) {
        const { exam } = req.body;
        let data = {};
        if (exam) {
            data.exam = exam
        }
        const attachments = await AttachmentModel.find(data);
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
        const { questionId, studentId } = req.query;
        try {
            const exam = await ExamModel.findOne({ studentId });
            const data = await AttachmentModel.findOne({ question: questionId, exam: exam._id });
            
            res.status(200);
            res.json(data)
        } catch (error) {
            res.status(401);
            res.json({message: 'Error : Bad request - ' + error.message})
        }
    }
    async create(req, res) {
        const { question, studentId, path } = req.body;
        const exam = await ExamModel.findOne({ studentId });
        try {            
            const result = await AttachmentModel.create({ exam: exam._id, question, path });
            res.status(201);
            res.send({ ...result, message: 'Attachment was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting attachment: ' + error.message});
        }
    }
}

export default AttachmentController;