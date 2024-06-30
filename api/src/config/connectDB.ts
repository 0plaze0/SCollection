import mongoose from "mongoose";
import satinizedConfig from "./config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(satinizedConfig.MONGO_URI);
    console.log("Mongo connection host ", conn.connection.host);
  } catch (error) {
    console.log("Error While Connecting to Database");
    console.log(error);
  }
};
