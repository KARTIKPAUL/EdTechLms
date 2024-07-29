import mongoose from "mongoose";
import { config  } from 'dotenv';
config();
mongoose.set('strictQuery',false)

const connectDb = async () => {
   try {
    const conn  = await mongoose.connect(process.env.MONGO_URI);

    if(conn){
        console.log(`MongoDb Connection Succesfuly: ${conn.connection.host}`);
    }

   } catch (error) {
        console.log(`MongoDb Connection Failed: ${error}`);
        process.exit(1);

   }

}

export default connectDb;