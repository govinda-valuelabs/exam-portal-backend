import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String, required: true
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'category'
    },
    options: Array,
    answer: {
        type: String
    },
    type: {
        type: String,
        default: 'radio'
    },
    attachment: {
        type: Boolean,
        default: false
    }
});

const QuestionModel = model('question', questionSchema);

export default QuestionModel;