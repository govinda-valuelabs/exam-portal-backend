import ReviewModel from '../model/review.model.js';
import ExamModel from '../model/exam.model.js';

class ReviewController {
    async getReviews(req, res) {
        const {student, exam} = req.body;
        let data = {};
        if (student) {
            data.student = student
        }
        if (exam) {
            data.exam = exam
        }
        const reviews = await ReviewModel.find(data).populate('student').populate('exam');
        res.status(200);
        res.json(reviews);
    }

    async getReview(req, res) {
        const { id } = req.params;
        try {
            const data = await ReviewModel.findById(id).populate('student').populate('exam');
            res.status(200);
            res.json(data)
        } catch (error) {
            res.status(401);
            res.json({message: 'Error : Bad request - ' + error.message})
        }
    }
    async getReviewByStudent(req, res) {
        const { student } = req.params;
        try {
            const data = await ReviewModel.findOne({ student }).populate('student').populate('exam');
            res.status(200);
            res.json(data)
        } catch (error) {
            res.status(401);
            res.json({message: 'Error : Bad request - ' + error.message})
        }
    }
    async create(req, res) {
        const { student, comment } = req.body;

        try {
            const exam = await ExamModel.findOne({ studentId: student });
            if (exam) {
                // check exisiting
                const find = await ReviewModel.findOne({ student });
                let result;
                if (find) {
                    find.comment = comment
                    find.save();
                } else {
                    const data = { student, exam: exam._id, comment }
                    result = await ReviewModel.create(data);
                }
                res.status(201);
                res.send({ ...result, message: 'Review was inserted successfully'});
            } else {
                res.status(404);
                res.send({ message: 'Survey Not found. '});
            }
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting review: ' + error.message});
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id
            await ReviewModel.findByIdAndUpdate(id, req.body);
            res.status(201);
            res.send({ message: 'OK', success: true});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in updating: ' + error.message});
        }
    }
}

export default ReviewController;