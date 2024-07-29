import express from 'express';
import { config  } from 'dotenv';
config();
import app from './app.js';
import connectDb from './Config/dbConn.js';
import cloudinary from 'cloudinary';


const PORT = process.env.PORT || 5000

//Cloudinary Configuration

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET 
})

app.listen(PORT , async () => {
    console.log(`App is runnig at http://localhost:${PORT}`);
    await connectDb()
})