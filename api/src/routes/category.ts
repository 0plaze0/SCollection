import express from "express";
import { dataValidation } from "../middleware/validation";
import { isAdmin, isLoggedIn } from "../middleware/authMiddleware";
import { categorySchema } from "../schemas/categorySchema";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "./../controllers/categoryController";

const router = express.Router();

router.post(
  "/create-category",
  isLoggedIn,
  isAdmin,
  dataValidation(categorySchema),
  createCategory
);
router.get("/get-category", isLoggedIn, isAdmin, getAllCategory);
router.get("/get-category/:slug", isLoggedIn, isAdmin, getCategory);
router.put("/update-category/:id", isLoggedIn, isAdmin, updateCategory);
router.delete("/delete-category/:id", isLoggedIn, isAdmin, deleteCategory);

export default router;
