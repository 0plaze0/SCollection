import { Request, Response } from "express";
import { categoryModel } from "../model/category";

import BadRequestError from "../errors/BadRequestError";
import slugify from "slugify";

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name)
    throw new BadRequestError({ code: 400, message: "Please provide a name" });
  const duplicate = await categoryModel.find({ name });
  if (duplicate)
    return res
      .status(200)
      .json({ success: true, message: "Category Already exist" });
  const category = await categoryModel.create({
    name,
    slug: slugify(name),
  });

  return res
    .status(200)
    .json({ succes: true, message: "Successfully create category" });
};

const getCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug)
    throw new BadRequestError({
      code: 400,
      message: "Please Provide valid name",
    });
  console.log(slug);
  const category = await categoryModel.findOne({ slug });
  console.log(category);
  if (!category)
    throw new BadRequestError({ code: 404, message: "Category not found" });

  return res.status(200).send({ success: true, category });
};

const getAllCategory = async (req: Request, res: Response) => {
  const category = await categoryModel.find({});

  return res.status(200).send({ success: true, category });
};
const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id)
    throw new BadRequestError({
      code: 400,
      message: "Please Provide valid id",
    });
  if (!name)
    throw new BadRequestError({
      code: 400,
      message: "Please Provide valid category name",
    });

  const ifExist = await categoryModel.findById(id);
  if (!ifExist)
    throw new BadRequestError({ code: 404, message: "Category doesn't exist" });

  const updateCategory = await categoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "Category Updated", updateCategory });
};
const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError({
      code: 400,
      message: "Please Provide valid id",
    });
  const ifExist = await categoryModel.findById(id);
  if (!ifExist)
    throw new BadRequestError({ code: 404, message: "Category doesn't exist" });

  const deleteCategory = await categoryModel.findByIdAndDelete(id);

  return res
    .status(200)
    .send({ success: true, message: "Category Deleted Successfully" });
};

export {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
