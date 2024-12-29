import mongoose from "mongoose";
import bcrypt from 'bcrypt'; 

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);   
    } catch (error) {
        next(error);    
    }
}



export const User = mongoose.model('user', UserSchema); 