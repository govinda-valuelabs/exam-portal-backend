import { Schema, model } from "mongoose";

const answerSchema = new Schema({
  examId: {
    type: Schema.Types.ObjectId, ref: 'exam'
  },
  question: {
    type: Schema.Types.ObjectId, ref: 'question'
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: 'option'
  },
  answer: {
    type: Schema.Types.ObjectId, ref: 'option'
  }
});

const QuestionModel = model('answer', answerSchema);

export default QuestionModel;