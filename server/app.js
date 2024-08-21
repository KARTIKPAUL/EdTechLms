import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();
import dotenv from 'dotenv'
import morgan from 'morgan';
dotenv.config();
import userRoutes from './Routes/userRoutes.js'
import courseRoutes from './Routes/courseRoutes.js'
import paymentRoutes from './Routes/paymentRoutes.js'
import miscellaneousRoutes from './Routes/miscellaneousRoutes.js'
import errorMiddleware from './Middlewares/errorMiddleware.js';

import bodyParser from 'body-parser'
// import passport from 'passport';
// import session from 'express-session';




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))

app.use(morgan('dev'))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(session({
//     secret: process.env.SESSION_SECRET, // Replace with your own secret
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookies in production
// }));


app.use('/home',(req,res) => {
    res.send('Hello')
})

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/payments',paymentRoutes)
app.use('/api/v1/',miscellaneousRoutes);

app.use('*',(req,res) => {
    res.send('Not Found Any Page')
})



app.use(errorMiddleware)

export default app;