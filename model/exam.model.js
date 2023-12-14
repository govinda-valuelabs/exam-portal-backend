import { Schema, model } from "mongoose";

const examSchema = new Schema({
    studentId: {
        type: String, required: true
    },
    questions: {
      type: [Object]
    },
    startTime: {
      type: Date, default: Date.now()
    },
    limit: {
      type: Number, default: 1200000 // 20*60*1000
    }
});

const ExamModel = model.exams || model('exam', examSchema);

export default ExamModel;