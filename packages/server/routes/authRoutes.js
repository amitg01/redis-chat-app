import { Router } from "express";
import validateForm from "../controllers/validateForm.js";

import {
  handleLogin,
  loginAttempt,
  handleRegister,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/login").get(handleLogin).post(validateForm, loginAttempt);

authRouter.post("/register", validateForm, handleRegister);

export default authRouter;
