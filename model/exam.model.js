import { Schema, model } from "mongoose";

const examSchema = new Schema({
    studentId: {
        type: String, required: true
    },
    questions: {
      type: Array(Object)
    },
    startTime: {
      type: Date, default: Date.now()
    }
});

const ExamModel = model.exams || model('exam', examSchema);

export default ExamModel;