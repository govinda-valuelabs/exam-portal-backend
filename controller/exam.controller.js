import AnswerModel from '../model/answer.model.js';
import ExamModel from '../model/exam.model.js';
import QuestionModel from '../model/question.model.js'

class ExamController {
    async getExams(req, res) {
        const exams = await ExamModel.find().populate('studentId').populate('category');
        res.status(200);
        res.json(exams);
    }
    async getExam(req, res) {
        const { id } = req.params;
        const data = await ExamModel.findById(id).populate('questions');
        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async question(req, res) {
        const { questionId } = req.params;
        const { studentId } = req.query;
        const question = await QuestionModel.findById(questionId);
        const exam = await ExamModel.findOne({ studentId });
        
        if (question) {
            let selected = null;
            if (exam?.questions) {
                const find = exam.questions.find((q) => q.questionId == questionId && q.status == 'attempted');
                selected = find?.optionId;
            }
            const first = await QuestionModel.findOne().sort({ _id: 1}).limit(1);
            const last = await QuestionModel.findOne().sort({ _id: -1}).limit(1);
            const isFirst = first._id == questionId;
            const isLast = last._id == questionId;
            const data = { _id: question._id, title: question.title, options: question.options, selected, isFirst, isLast }
            res.status(200);
            res.json(data)
        } else {
            res.status(200);
            res.json(null)
        }
    }
    async questions(req, res) {
        const { studentId } = req.params;
        const exam = await ExamModel.findOne({ studentId });
        const data = [];

        try {
            
            const questions = await QuestionModel.find({ category: exam.category });
    
            questions.forEach((q) => {
                data.push({
                    _id: q._id,
                    title: q.title,
                    options: q.options
                })
            })
            
        } catch (error) {
            
        }
        res.status(200);
        res.json({...data});
    }
    async getExamStatus(req, res) {
        try {
            const { studentId } = req.params;
            const result = await ExamModel.findOne({ studentId }).populate('questions').populate('category');
            res.status(200);
            res.json(result);
        } catch (error) {
            res.status(404);
            res.json({message: 'No exam attended by this student'});
        }
    }
    async updateExam(req, res) {
        const { studentId } = req.params;
        const { questionId, status, optionId, text, type } = req.body;

        const result = await ExamModel.findOne({ studentId });

        if (result) {
            const existing = result.questions.find((q) => q == questionId);
            
            if (!existing) {
                result.questions = [...result.questions, questionId];
                result.save();
            }

            const answer = await AnswerModel.findOne({ question: questionId, exam: result._id });
            if (answer) {
                
                if (status == 'attempted') {
                    answer.status = status
                }

                if (type == 'checkbox') {
                    answer.option = answer.option ? [...answer.option, optionId] : [optionId] 
                } else if (['radio', 'boolean'].includes(type)) {
                    answer.option = [optionId]
                }

                if (text) {
                    answer.answer = text
                }

                answer.save();
            } else {
                await AnswerModel.create({ status, answer: optionId, question: questionId, exam: result._id });
            }
        }
        res.status(200);
        res.json({message: 'Success'});
    }
    async create(req, res) {
        try {
            const { category, studentId } = req.body;
            let result = await ExamModel.findOne({ studentId });
            if (!result) {
                result = await ExamModel.create({ category, studentId });
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