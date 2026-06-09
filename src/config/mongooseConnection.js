import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoConnection = async () => {
  const mongoUri =
    process.env.MONGO_URL;
    console.log(mongoUri);
    // console.log(process.env)
  try {
    await mongoose.connect(mongoUri);
    console.log("mongoose connection successful");
  } catch (err) {
    console.error("mongoose connection failed:", err?.message || err);
    process.exitCode = 1;
  }
};

export default mongoConnection;
// momgoConnection()