import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import { connectDB } from "./config/connectDB";

connectDB();

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  return res.status(200).send({ message: "hello" });
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
