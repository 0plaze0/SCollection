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
    const { accessToken } = req.cookies;
    if (!accessToken)
      return res
        .status(401)
        .json({ success: false, message: "Please Login to continue" });
    const result = (await jwt.verify(
      accessToken,
      config.ACCESS_TOKEN
    )) as jwtPayload;
    const user = await userModel.findById(result._id);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid User! Unauthorized" });
    res.locals.user = result;

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error in Login Middleware", error });
  }
};
const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals;
    const isAdmin = await userModel.findById(user._id);
    if (isAdmin?.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized Access" });
    } else next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error in admin Middleware", error });
  }
};
export { isLoggedIn, isAdmin };
