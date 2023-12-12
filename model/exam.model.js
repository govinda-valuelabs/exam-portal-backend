import { Schema, model } from "mongoose";

const examSchema = new Schema({
    studentId: {
        type: String, required: true
    },
    questions: [Object],
    start: {
      type: Date, default: Date.now()
    },
    time: {
      type: Number, default: 1200 // seconds
    }
});

const ExamModel = model.exams || model('exam', examSchema);

export default ExamModel;