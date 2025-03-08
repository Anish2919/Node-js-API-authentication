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
            if(err) {
                if(err.name==="JsonWebTokenError") {
                    throw new createHttpError.Unauthorized(); 
                } else { 
                    throw new createHttpError.Unauthorized(err.message); 
                }
            }
            req.payload = result; 
            next(); 
        })
    } catch (error) {
        next(error); 
    }
}

function signRefreshToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwt_secret_key, {
            expiresIn: "12h", 
            issuer: "anish.com", 
        }, (err, decodedResult) => {
            if(err) {
                reject(createHttpError.InternalServerError(err.message)); 
            }
            resolve(decodedResult); 
        })
    })
}

export { signAccessToken, verifyAccessToken, signRefreshToken }; 