import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'student' },
    type: String,
    comment: {
        type: String
    },
    question: {
        type: Schema.Types.ObjectId, ref: 'question'
    },
});

const FeedbackModel = model('feedback', feedbackSchema);

export default FeedbackModel;