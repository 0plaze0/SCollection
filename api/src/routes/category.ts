import express from "express";
import { dataValidation } from "../middleware/validation";
import { isAdmin, isLoggedIn } from "../middleware/authMiddleware";
import { categorySchema } from "../schemas/categorySchema";
import { createCategory } from "./../controllers/categoryController";

const router = express.Router();

router.post(
  "/create-category",
  isLoggedIn,
  isAdmin,
  dataValidation(categorySchema),
  createCategory
);

export default router;
