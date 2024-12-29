import { configDotenv } from 'dotenv';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken'; 
configDotenv(); 
const jwt_secret_key = process.env.JWT_SECRET_KEY; 


// generating access token using jwt-web-token 
function signAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwt_secret_key,{
            expiresIn: '1h',
            issuer: "pickuppage.com"    
        }, (err, token) => {
            if(err) {
                console.log(err.message); 
                reject(createHttpError.InternalServerError()); 
            }
            resolve(token); 
        }); 
    })
}; 


export { signAccessToken }; 