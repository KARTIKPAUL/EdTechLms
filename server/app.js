import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
//import connectDb from './Config/dbConn.js';

const app = express()


//Middlewares
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'))


//DatabaseConnection

//connectDb();


//Routes Configuration
import userRoutes from './Routes/userRoutes.js'
import errorMiddleware from './Middlewares/errorMiddleware.js';
app.use('/api/v1/user', userRoutes)



app.use('/fg',(req,res) =>{
    res.send('Hello');
})

app.all('*',(req,res) => {
    res
        .status(404)
        .send(`OOPS !! 404 page Not Found)`)
})

app.use(errorMiddleware);

export default app; 
