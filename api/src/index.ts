import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "express-async-errors";

import { connectDB } from "./config/connectDB";

import auth from "./routes/auth";
import product from "./routes/product";
import {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express-serve-static-core";
import { errorHandler } from "./middleware/error";

connectDB();

const app = express();
const PORT = 3000;

// export class HttpException extends Error {
//   public status: number;
//   public message: string;
//   constructor(status: number, message: string) {
//     super(message);
//     this.status = status;
//     this.message = message;
//   }
// }

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/product", product);
// app.use("*", async (req, res, next) => {
//   const err = new HttpException(404, `cannot find ${req.originalUrl} url`);
//   next(err);
// });

//error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
