import { Request, Response } from "express";
import { categoryModel } from "../model/category";
import BadRequestError from "../errors/BadRequestError";
import slugify from "slugify";

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name)
    throw new BadRequestError({ code: 400, message: "Please provide a name" });

  const category = await categoryModel.create({
    name,
    slug: slugify(name),
  });

  return res
    .status(200)
    .json({ succes: true, message: "Successfully create category" });
};

export { createCategory };
