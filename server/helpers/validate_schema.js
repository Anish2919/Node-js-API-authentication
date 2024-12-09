import Joi from 'joi'; 


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
const authSchema = Joi.object({
    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
        .lowercase()
        .required(),
    password: Joi.string().min(8).required().pattern(new RegExp(passwordRegex))
}); 


export { 
    authSchema
}
