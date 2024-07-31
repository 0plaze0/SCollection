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

    return res.status(200).json({
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

const updateProduct = async (req: Request<{}, {}, Product>, res: Response) => {
  try {
    const { id } = req.params as { id: string }; //type assertion

    if (!id)
      return res
        .status(404)
        .json({ success: false, message: "Please send a valid Id" });

    const { name, price, description, category, quantity, shipping } = req.body;

    const updateData: Partial<Product> = {
      name,
      price,
      description,
      category,
      quantity,
      shipping,
    };
    let result: Product | null;

    if (req.file) {
      result = await productModel.findById(id);
      if (result)
        await cloudinary.uploader.destroy(result?.image?.id as string, {
          invalidate: true,
        });
      const { path } = req.file;
      const photo = await cloudinary.uploader.upload(path);

      updateData.image = { id: photo.public_id, url: photo.secure_url };
    }

    result = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res
      .status(200)
      .json({ success: true, message: "Successfully updated product", result });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while updating product" });
  }
};

const getProduct = async (req: Request<{}, {}, Product>, res: Response) => {
  try {
    const { id } = req.params as { id: string }; //type assertion

    if (!id)
      return res
        .status(404)
        .json({ success: false, message: "Please send a valid Id" });

    const product = await productModel.findById(id);

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while getting product" });
  }
};

const getAllProduct = async (req: Request<{}, {}, Product>, res: Response) => {
  try {
    const products = await productModel.find({});

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while getting product" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (product)
      await cloudinary.uploader.destroy(product?.image?.id as string, {
        invalidate: true,
      });

    return res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error while getting product" });
  }
};

export {
  createProduct,
  updateProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
};
