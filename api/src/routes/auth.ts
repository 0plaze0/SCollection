import express from "express";
import { dataValidation } from "../middlewares/validation";
import { authUser, createUser } from "./../controllers/authController";
import { userAuthSchema, userRegistrationSchema } from "../schemas/userSchemas";
const router = express.Router();

router.post("/register", dataValidation(userRegistrationSchema), createUser);
router.post("/login", dataValidation(userAuthSchema), authUser);

export default router;
