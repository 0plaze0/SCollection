import express from "express";
import { dataValidation } from "../middlewares/validation";
import { createUser } from "./../controllers/authController";
import { userRegistrationSchema } from "../schemas/userSchemas";
const router = express.Router();

router.post("/register", dataValidation(userRegistrationSchema), createUser);

export default router;
