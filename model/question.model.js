import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String, required: true
    },
    options: [String],
    answer: {
        type: String, required: true
    },
    status: String // Not Opened, Opened, Attempted
});

const QuestionModel = model.questions || model('question', questionSchema);

export default QuestionModel;