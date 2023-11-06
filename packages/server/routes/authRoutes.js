import { Router } from "express";
import validateForm from "../middleware/validateForm.js";
import rateLimiter from "../middleware/rateLimiter.js";

import {
  handleLogin,
  loginAttempt,
  handleRegister,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter
  .route("/login")
  .get(handleLogin)
  .post(rateLimiter(60, 10), validateForm, loginAttempt);

authRouter.post("/register", rateLimiter(30, 4), validateForm, handleRegister);

export default authRouter;
