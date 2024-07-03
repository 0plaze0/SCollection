import { Request, Response } from "express";
import userModel from "./../model/User";
import { User } from "./../types/user";
import { hashPassword } from "../utils/authUtils";
import config from "../config/config";

const createUser = async (req: Request<{}, {}, User>, res: Response) => {
  try {
    const { name, email, address, password, phone } = req.body;

    //hash password
    const salt = await parseInt(config.SALT_ROUND);
    const hashpwd = await hashPassword(password, salt);

    const newUser = {
      name,
      email,
      address,
      phone,
      password: hashpwd,
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

export { createUser };
