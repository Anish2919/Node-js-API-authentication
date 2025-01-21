import { configDotenv } from 'dotenv';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken'; 
configDotenv(); 
const jwt_secret_key = process.env.JWT_SECRET_KEY; 


// generating access token using jwt-web-token 
function signAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwt_secret_key,{
            expiresIn: "1h",
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

async function verifyAccessToken(req,res,next) {
    try {
        if(!req.headers['authorization']) {
            throw new createHttpError.Unauthorized(); 
        }
        const bearerToken = req.headers['authorization'].split(' ')[1]; 
        if(!bearerToken) throw new createHttpError.Unauthorized(); 

        const verifyToken = await jwt.verify(bearerToken, jwt_secret_key, (err, result) => {
            if(err) throw createHttpError.Unauthorized(); 
            req.payload = result; 
            next(); 
        })
    } catch (error) {
        next(error); 
    }
}

export { signAccessToken, verifyAccessToken }; 