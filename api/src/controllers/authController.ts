import { Request, Response } from "express";
import userModel from "./../model/User";
import { User } from "./../types/user";

const createUser = async (req: Request<{}, {}, User>, res: Response) => {
  try {
    const { name, email, address, password, phone } = req.body;

    const user = await userModel.create({ ...req.body });
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
