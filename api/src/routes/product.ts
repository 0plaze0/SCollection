import express from "express";
import { dataValidation } from "../middlewares/validation";
import { createProduct } from "./../controllers/productController";
import { productSchema } from "../schemas/productSchema";
import { upload } from "../config/multer";

const router = express.Router();

router.post(
  "/create-product",
  upload.single("file"),
  dataValidation(productSchema),
  createProduct
);

export default router;
