import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGODB_URI } = ENV;
    if (MONGODB_URI) throw new Error("MONGODB_URI is not defined");

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongnDB Connection " + error);
    process.exit(1); // "1" status code means failure
  }
};
