import express from "express";
import { dataValidation } from "../middleware/validation";
import {
  authUser,
  createUser,
  forgotPassword,
} from "./../controllers/authController";
import { userAuthSchema, userRegistrationSchema } from "../schemas/userSchemas";
const router = express.Router();

router.post("/register", dataValidation(userRegistrationSchema), createUser);
router.post("/login", dataValidation(userAuthSchema), authUser);
router.post("/reset-password", forgotPassword);

export default router;
