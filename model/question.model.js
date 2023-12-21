import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String, required: true
    },
    options: Array,
    answer: {
        type: String
    }
});

const QuestionModel = model('question', questionSchema);

export default QuestionModel;