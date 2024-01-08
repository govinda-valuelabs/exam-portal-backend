import { Schema, model } from "mongoose";

const examSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId, ref: 'student'
    },
    category: {
      type: Schema.Types.ObjectId, ref: 'category'
    },
    questions: {
      type: [{type: Schema.Types.ObjectId, ref: 'question'}]
    },
    startTime: {
      type: Date, default: null
    },
    endTime: {
      type: Date, default: null
    }, 
});

const ExamModel = model('exam', examSchema);

export default ExamModel;