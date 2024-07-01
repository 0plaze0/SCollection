import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { connectDB } from "./config/connectDB";

import auth from "./routes/auth";

connectDB();

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", auth);

mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
