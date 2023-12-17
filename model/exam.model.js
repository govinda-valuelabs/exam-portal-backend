import { Schema, model } from "mongoose";

const examSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId, ref: 'student'
  },
  answers: [{
    type: Schema.Types.ObjectId, ref: 'answer'
  }],
  startTime: {
    type: Date, default: Date.now('Asia/Kolkata')
  },
  limit: {
    type: Number, default: 1200000 // 20*60*1000
  },
  endTime: {
    type: Date, default: null
  },
});

const ExamModel = model('exam', examSchema);

export default ExamModel;