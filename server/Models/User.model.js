import mongoose from "mongoose";
import bcrypt from 'bcrypt'; 

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

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(this.password, salt); 
        this.password = hashedPassword; 
        next(); 
    } catch (error) {
        next(error); 
    }
}); 

UserSchema.post("save", async function(next) {
    try {
        console.log("called after the user schema..")
    } catch (error) {
        next(error); 
    }
}); 


export const User = mongoose.model('user', UserSchema); 