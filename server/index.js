import dotenv from 'dotenv'; 
dotenv.config(); 


import express from 'express'; 
import morgan from 'morgan';
import AuthRoute from './routes/Auth.route.js'; 
import createError from 'http-errors'; 
import helmet from 'helmet'; 
import connectToMongodb from './helpers/init_mongodb.js';

const app = express(); 

const port = process.env.PORT || 3000; 

// configs 
app.use(helmet());  
// Log http requests after security headers are set 
app.use(morgan("dev")); 
app.use(express.json()); 
app.use(express.urlencoded({extended: true}))

// auth routes 
app.use("/auth", AuthRoute)


// error handler for not found page
app.use(async (res, req, next) => {
    // const error = new Error("Not found")
    // error.status = 404; 
    next(createError.NotFound()); 
})

// global error handler 
app.use((err, req, res, next) => {
    res.status(err.status || 500); 
    res.send({
        error: {
            status: err.status || 500,
            message: err.message 
        }
    })
})



// connecting to mongodb 
connectToMongodb(); 

app.listen(port, () => {
    console.log(`App is running at port: ${port}`);
})