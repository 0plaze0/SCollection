import express from "express";
import { dataValidation } from "../middleware/validation";
import {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./../controllers/productController";
import { productSchema } from "../schemas/productSchema";
import { upload } from "../config/multer";
import { isAdmin, isLoggedIn } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-product",
  upload.single("file"),
  dataValidation(productSchema),
  createProduct
);

router.put("/update-product/:id", upload.single("file"), updateProduct);
router.get("/get-all-product", getAllProduct);
router.get("/get-product/:id", getProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/test-user", isLoggedIn, isAdmin, async (req, res) => {
  console.log(res.locals);
  res.send({ messsage: "hello" });
});

export default router;
