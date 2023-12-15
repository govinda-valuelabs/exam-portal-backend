import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    }
});

const StudentModel = model('student', studentSchema);

export default StudentModel;