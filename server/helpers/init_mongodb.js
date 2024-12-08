import mongoose from "mongoose"; 

const dbName = process.env.DB_NAME || 'JWT_AUTH'; 
const dbUri = process.env.MONGOOSE_URL || 'mongodb://localhost:27017/jwt_auth'; 


export default function connectToMongodb() {
     mongoose.connect(dbUri, {
        dbName: dbName, 
    }).then(() => {
        console.log('connected to mongodb server');
    })
    
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db'); 
    })
    
    mongoose.connection.on('error', (error) => {
        console.log('error from error connection: ', error.message);
    })
    
    mongoose.connection.on("disconnected", () => {
        console.log('Mongoose connection is disconnected');
    })
}

