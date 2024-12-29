import express from 'express'; 
import createError from 'http-errors'; 
import { User } from '../Models/User.model.js';
// import { authSchema } from '../helpers/validate_schema.js';
import { authSchema } from '../helpers/validate_schema.js';
import { signAccessToken } from '../helpers/jwt_helper.js';

const router = express.Router(); 

const salt = process.env.BCRYPT_SALT || 10; 

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
        const accessToken = await signAccessToken({email: newUser.email, id: newUser._id}); 
        res.send(accessToken); 
    } catch (error) {
        if(error.isJoi === true) error.status = 422; 
        next(error); 
    }
}); 

// LOGIN ROUTER 
router.post("/login", async(req, res, next) => {
    try {
        const {email, password} = await authSchema.validateAsync(req.body); // validating or sanitizing password 
        const user = await User.findOne({email: email}, 'email password -_id');  
        if(!user) throw createError.BadRequest("Email not registered! Please register before loggin in."); 

        const isMatch = await user.isValidPassword(password); 
        if(!isMatch) throw createError.Unauthorized("Username/password not valid"); 

        const accessToken = await signAccessToken({id: user._id, email: email}); 
        res.status(200).json({message: "LoggedIn successfully", accessToken: accessToken});  
    } catch (error) {
        if(error.isJoi === true) return next(createError.BadRequest("Invalid username and password")); 
        next(error); 
    }
}); 


// REFRESH TOKEN 
router.post("/refresh-token", async(req, res, next) => {
    res.send('refreh token router'); 
}); 

// LOGOUT ROUTER 
router.delete("/logout", async(req, res, next) => {
    res.send("logout router"); 
}); 


export default router; 