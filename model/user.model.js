import { Schema, model } from "mongoose";

const userSchema = new Schema({
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

const UserModel = model.users || model('user', userSchema);

export default UserModel;