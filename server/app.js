import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();
import dotenv from 'dotenv'
import morgan from 'morgan';
dotenv.config();
import userRoutes from './Routes/userRoutes.js'
import courseRoutes from './Routes/courseRoutes.js'
import errorMiddleware from './Middlewares/errorMiddleware.js';




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))

app.use(morgan('dev'))

app.use(cookieParser());

app.use('/home',(req,res) => {
    res.send('Hello')
})

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/courses',courseRoutes)

app.use('*',(req,res) => {
    res.send('Not Found Any Page')
})

app.use(errorMiddleware)

export default app;