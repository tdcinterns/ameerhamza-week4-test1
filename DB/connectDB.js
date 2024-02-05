import mongoose from "mongoose";

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the mongodb...");
    }
    catch(error){
        console.log(`Error while connecting to Mongodb ${error}`);
    }
}

export default connectDB;