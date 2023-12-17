import { Schema, model } from "mongoose";

const optionSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId, ref: 'question'
  },
  value: String,
});

const OptionModel = model('option', optionSchema);

export default OptionModel;