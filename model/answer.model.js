import { Schema, model } from "mongoose";

const answerSchema = new Schema({
    status: String,
    type: String,
    answer: {
        type: String
    },
    option: [{
        type: Schema.Types.ObjectId, ref: 'option'
    }],
    question: {
        type: Schema.Types.ObjectId, ref: 'question'
    },
    exam: {
        type: Schema.Types.ObjectId, ref: 'exam'
    }
});

const AnswerModel = model('answer', answerSchema);

export default AnswerModel;