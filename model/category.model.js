import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String, required: true
    },
    description: {
        type: String, default: ''
    },
    questions: [{
        type: Schema.Types.ObjectId, ref: 'question'
    }],
    exams: [{
        type: Schema.Types.ObjectId, ref: 'exam'
    }]
});

const CategoryModel = model('category', categorySchema);

export default CategoryModel;