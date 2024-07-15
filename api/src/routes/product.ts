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
import { isLoggedIn } from "../middleware/authMiddleware";

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
router.get("/test-user", isLoggedIn, async (req, res) => {
  console.log(res.locals);
  res.send({ messsage: "hello" });
});

export default router;
