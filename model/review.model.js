import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'student' },
    exam: { type: Schema.Types.ObjectId, ref: 'exam' },
    type: String,
    comment: {
        type: String
    },
});

const ReviewModel = model('review', reviewSchema);

export default ReviewModel;