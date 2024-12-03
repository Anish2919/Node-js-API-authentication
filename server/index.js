import express from 'express'; 
import morgan from 'morgan';
import createError from 'http-errors'; 
import dotenv from 'dotenv'; 
import AuthRoute from './routes/Auth.route.js'; 
import helmet from 'helmet'; 
dotenv.config(); 

const app = express(); 

// configs 
app.use(helmet());  

// Log http requests after security headers are set 
app.use(morgan("dev")); 

// auth routes 
app.use("/auth", AuthRoute)

// testing home route 
app.get("/", async(req, res, next) => {
    res.send("Hello response"); 
}); 

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


const port = process.env.PORT || 3000; 

// starting express applications
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})