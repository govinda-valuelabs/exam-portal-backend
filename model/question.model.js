import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String, required: true
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'option'
    }],
    answer: {
        type: String
    }
});

const QuestionModel = model('question', questionSchema);

export default QuestionModel;