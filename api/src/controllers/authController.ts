import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import userModel from "./../model/User";
import { User } from "./../types/user";
import { compareHash, hashPassword } from "../utils/authUtils";
import config from "../config/config";

const createUser = async (req: Request<{}, {}, User>, res: Response) => {
  try {
    const { name, email, address, password, phone, answer } = req.body;

    //hash password
    const salt = await parseInt(config.SALT_ROUND);
    const hashpwd = await hashPassword(password, salt);

    const newUser = {
      name,
      email,
      address,
      phone,
      password: hashpwd,
      answer,
    };

    const user = await userModel.create(newUser);
    return res.status(200).json({
      success: true,
      message: "User successfully created",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating User",
      error,
    });
  }
};

const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Please Enter Valid Email" });

    const compare: boolean = await compareHash(password, user.password);
    if (compare) {
      const accessToken = await jwt.sign(
        { _id: user._id },
        config.ACCESS_TOKEN,
        {
          expiresIn: "7d",
        }
      );

      const cookieOpts = {
        sameSite: "lax",
      } as const;

      return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOpts)
        .send({
          success: true,
          message: "You are successfully login",
          user,
          token: accessToken,
        });
    } else {
      res.status(401).json({
        success: false,
        message: "Either Email or Password is Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while Signing In",
      error,
    });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const {
      email,
      newPassword,
      answer,
    }: { email: string; newPassword: string; answer: string } = req.body;

    if (!email || !newPassword || !answer)
      return res
        .status(404)
        .send({ success: false, message: "Please Provide all field" });

    const user = await userModel.findOne({ email, answer });

    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "Either email or password is wrong" });

    //hash password
    const salt = await parseInt(config.SALT_ROUND);
    const hashpwd = await hashPassword(newPassword, salt);

    const updateUser = await userModel.findByIdAndUpdate(user._id, {
      password: hashpwd,
    });

    res.status(200).send({
      success: true,
      message: "Password Successfully Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while Reseting Password",
    });
  }
};
export { authUser, createUser, forgotPassword };
