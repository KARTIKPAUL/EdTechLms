import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

mongoose.set('strictQuery',false);

const connectionToDb = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        if(conn){
            console.log(`Mongo Db Connection Sucesss !!`);
        }
    } catch (error) {
        console.log(`Error Happen While Db Connect ! ${error}`);
    }
}

export default connectionToDb;