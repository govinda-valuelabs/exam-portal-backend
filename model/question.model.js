import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String, required: true
    },
    answers: [String],
    answer: {
        type: String, required
    }
});

const QuestionModel = model.questions || model('question', questionSchema);

export default QuestionModel;