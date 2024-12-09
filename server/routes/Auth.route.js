import express from 'express'; 
import createError from 'http-errors'; 
import { User } from '../Models/User.model.js';
// import { authSchema } from '../helpers/validate_schema.js';
import { authSchema } from '../helpers/validate_schema.js';

const router = express.Router(); 

// REGISTER ROUTER 
router.post("/register", async(req, res, next) => {
    try {
        const { email, password } = req.body; 

        // validating input schema using Joi 
        const sanitizedRequestBody = await authSchema.validateAsync(req.body);

        const doesExist = await User.findOne({email: sanitizedRequestBody.email}); 
        if(doesExist) throw createError.Conflict(`${email} is already been registered.`); 

        // creating user and saving in database 
        const newUser = await User.create({email: sanitizedRequestBody.email, password: password}); 
        if(newUser) {
            res.status(201).json({message: "User created successfully."}); 
        }
    } catch (error) {
        if(error.isJoi === true) error.status = 422; 
        next(error); 
    }
}); 

// LOGIN ROUTER 
router.post("/login", async(req, res, next) => {
    console.log(req.body); 
    res.send("login router"); 
}); 

// mos update latest 

// REFRESH TOKEN 
router.post("/refresh-token", async(req, res, next) => {
    res.send('refreh token router'); 
}); 

// LOGOUT ROUTER 
router.delete("/logout", async(req, res, next) => {
    res.send("logout router"); 
}); 


export default router; 