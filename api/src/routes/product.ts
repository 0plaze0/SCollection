import express from "express";
import { dataValidation } from "../middlewares/validation";
import {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "./../controllers/productController";
import { productSchema } from "../schemas/productSchema";
import { upload } from "../config/multer";

const router = express.Router();

router.post(
  "/create-product",
  upload.single("file"),
  dataValidation(productSchema),
  createProduct
);

router.put("/update-product/:id", upload.single("file"), updateProduct);
router.get("/get-product", getAllProduct);
router.get("/get-product/:id", getProduct);

export default router;
