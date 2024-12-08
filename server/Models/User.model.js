import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        lowercase: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true, 
    }
}); 

export const User = mongoose.model('user', UserSchema); 