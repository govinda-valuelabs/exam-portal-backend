import QuestionModel from '../model/question.model.js';
import OptionModel from '../model/option.model.js';
import ExamModel from '../model/exam.model.js';

class QuestionController {
    async getQuestions(req, res) {
        const questions = await QuestionModel.find().populate('category').populate('options');
        res.status(200);
        res.json(questions);
    }
    async getQuestionsByCategory(req, res) {
        const { category } = req.params;
        const questions = await QuestionModel.find({ category }).populate('category').populate('options');
        res.status(200);
        res.json(questions);
    }
    async getQuestion(req, res) {
        const { id } = req.params;
        const { studentId } = req.query;
        const exam = await ExamModel.findOne({ studentId });
        const question = await QuestionModel.findById(id).populate('options');
        const filter = {};
        if (exam) {
            filter.category = exam.category;
        }
        const first = await QuestionModel.findOne(filter).sort({ _id: 1}).limit(1);
        const last = await QuestionModel.findOne(filter).sort({ _id: -1}).limit(1);
        const isFirst = first._id == id;
        const isLast = last._id == id;
        const data = { _id: question._id, category: question.category, title: question.title, type: question.type, options: question.options, attachment: question.attachment, isFirst, isLast }

        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async create(req, res) {
        try {
            const { title, category, answer, type, attachment, options } = req.body
            const question = await QuestionModel.create({ title, category, answer, type, attachment });
            if (type != 'text') {
                let data = [];
                options.forEach((o, i) => {
                    data.push({
                        question: question._id,
                        value: o.value
                    })
                })

                const optionIds = await OptionModel.insertMany(data);
                const ids = [];

                optionIds.forEach((op) => {
                    ids.push(op._id);
                });

                if (ids.length) {
                    question.options = ids;
                    question.save();
                }
            }
            res.status(201);
            res.send({ ...question, message: 'Question was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting question: ' + error.message});
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id;
            const { title, category, answer, type, attachment, options } = req.body
            await QuestionModel.findByIdAndUpdate(id, { title, category, answer, type, attachment });
            await OptionModel.deleteMany({ question: id });
            let data = [];
            options.forEach((o, i) => {
                data.push({
                    question: id,
                    value: o.value
                })
            })

            const optionIds = await OptionModel.insertMany(data);
            const ids = [];

            optionIds.forEach((op) => {
                ids.push(op._id);
            });

            if (ids.length) {
                await QuestionModel.findByIdAndUpdate(id, { options: ids });
            }
            
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
            await OptionModel.deleteMany({ question: id });
            res.status(204);
            res.send({ message: 'Question was deleted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in deleting: ' + error.message});
        }
    }
}

export default QuestionController;