import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
}));

app.use(cookieParser());


app.use('/new', function(req,res){
        res.send('Helli Ji')
    }
)

app.all('*',(req,res) => {
    res.send('404 Error !')
})

export default app;