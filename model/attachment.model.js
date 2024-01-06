import { Schema, model } from "mongoose";

const attachmentSchema = new Schema({
    path: {type: String, required: true},
    question: {
        type: Schema.Types.ObjectId, ref: 'question'
    },
    exam: {
        type: Schema.Types.ObjectId, ref: 'exam'
    }
});

const AttachmentModel = model('attachment', attachmentSchema);

export default AttachmentModel;