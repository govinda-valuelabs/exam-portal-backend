import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String, required: true
    },
    options: [Object],
    answer: {
        type: String, required: true
    }
});

const QuestionModel = model('question', questionSchema);

export default QuestionModel;