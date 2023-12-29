import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String, required: true
    },
    options: Array,
    answer: {
        type: String
    },
    type: String,
    document: {
        type: Boolean,
        default: false
    }
});

const QuestionModel = model('question', questionSchema);

export default QuestionModel;