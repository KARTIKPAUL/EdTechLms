import app from './app.js'
import dotenv from 'dotenv'
import connectionToDb from './Config/dbConnect.js';
dotenv.config();
import clodinary from 'cloudinary'
import Razorpay from "razorpay";

const PORT = process.env.PORT || 5000;

clodinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

app.listen(PORT , async () => {
    await connectionToDb();
    console.log(`App is starts in https://localhost:${PORT}`);
})



 
