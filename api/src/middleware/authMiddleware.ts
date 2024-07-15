import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

import userModel from "../model/User";

interface jwtPayload {
  _id: string;
  iat: number;
  exp: number;
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(401).json({ message: "Please Login to continue" });
    const result = (await jwt.verify(token, config.ACCESS_TOKEN)) as jwtPayload;
    const user = await userModel.findById(result._id);
    if (!user)
      return res.status(401).json({ message: "Invalid User! Unauthorized" });
    res.locals.user = result;

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error in Login Middleware", error });
  }
};

export { isLoggedIn };
