import { Request, Response } from "express";
import { Product } from "../types/product";
import cloudinary from "../config/cloudinary";
import { productModel } from "../model/Product";

const createProduct = async (req: Request<{}, {}, Product>, res: Response) => {
  try {
    const { name, price, description, category, quantity, shipping } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const { path } = req.file;
    const photo = await cloudinary.uploader.upload(path);

    const newProduct = {
      name,
      price,
      description,
      category,
      quantity,
      shipping,
      image: { id: photo.public_id, url: photo.secure_url },
    };

    const product = await productModel.create(newProduct);

    return res
      .status(200)
      .json({
        success: true,
        message: "Product Created Successfully",
        product,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating product",
    });
  }
};

export { createProduct };
