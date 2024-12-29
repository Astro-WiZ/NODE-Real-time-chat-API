import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb Connected!");
    } catch (err) {
        console.log("MongoDb Connection Failed!", err);
    }
};

export default connectMongoDb;
